package com.dubu.backend.todo.service.impl;

import com.dubu.backend.global.domain.PageResponse;
import com.dubu.backend.member.domain.Member;
import com.dubu.backend.member.domain.enums.Status;
import com.dubu.backend.member.exception.MemberCategoryNotFoundException;
import com.dubu.backend.member.exception.MemberNotFoundException;
import com.dubu.backend.member.infra.repository.MemberCategoryRepository;
import com.dubu.backend.member.infra.repository.MemberRepository;
import com.dubu.backend.plan.domain.Path;
import com.dubu.backend.plan.exception.InvalidMemberStatusException;
import com.dubu.backend.plan.exception.PathNotFoundException;
import com.dubu.backend.plan.infra.repository.PathRepository;
import com.dubu.backend.todo.dto.common.Cursor;
import com.dubu.backend.todo.dto.request.RecommendTodoQueryRequest;
import com.dubu.backend.todo.dto.request.SaveTodoQueryRequest;
import com.dubu.backend.todo.dto.response.TodoInfo;
import com.dubu.backend.todo.dto.search.TodoSearchCond;
import com.dubu.backend.todo.entity.*;
import com.dubu.backend.todo.exception.ScheduleNotFoundException;
import com.dubu.backend.todo.repository.CategoryRepository;
import com.dubu.backend.todo.repository.ScheduleRepository;
import com.dubu.backend.todo.repository.TodoRepository;
import com.dubu.backend.todo.service.TodoQueryService;
import com.dubu.backend.todo.support.TodoRandomSelector;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TodoQueryServiceImpl implements TodoQueryService {
    private final MemberRepository memberRepository;
    private final MemberCategoryRepository memberCategoryRepository;
    private final TodoRepository todoRepository;
    private final ScheduleRepository scheduleRepository;
    private final CategoryRepository categoryRepository;
    private final PathRepository pathRepository;
    private final TodoRandomSelector todoRandomSelector;


    @Transactional
    @Override
    public List<TodoInfo> findTodayTodos(Long memberId) {
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new MemberNotFoundException(memberId));

        Schedule todaySchedule = scheduleRepository.findLatestSchedule(member, LocalDate.now()).orElseGet(() -> {
            Schedule newSchedule = Schedule.of(LocalDate.now(), member);
            List<Long> categoryIds = memberCategoryRepository.findCategoryIdsByMember(member);

            if(categoryIds.isEmpty()){
                throw new MemberCategoryNotFoundException(memberId);
            }
            List<Todo> todos = todoRepository.findTodosWithCategoryByCategoryIdsAndType(categoryIds, TodoType.RECOMMEND);

            Todo recommendTodo = todoRandomSelector.selectOne(todos);

            Schedule savedSchedule = scheduleRepository.save(newSchedule);

            Todo newTodo = Todo.of(recommendTodo.getTitle(), TodoType.SCHEDULED, recommendTodo.getDifficulty(), null, member, recommendTodo.getCategory(), recommendTodo, newSchedule, null);
            todoRepository.save(newTodo);

            return savedSchedule;
        });

        List<Todo> todos = todoRepository.findTodosWithCategoryBySchedule(todaySchedule);

        return todos.stream().map(TodoInfo::fromEntity).toList();
    }

    @Transactional(readOnly = true)
    @Override
    public List<TodoInfo> findTomorrowTodos(Long memberId) {
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new MemberNotFoundException(memberId));

        Schedule schedule = scheduleRepository.findLatestSchedule(member, LocalDate.now().plusDays(1)).orElseThrow(ScheduleNotFoundException::new);

        List<Todo> todos = todoRepository.findTodosWithCategoryBySchedule(schedule);
        return todos.stream().map(TodoInfo::fromEntity).toList();
    }

    @Transactional(readOnly = true)
    @Override
    public PageResponse<Long, List<TodoInfo>> findSaveTodos(Long memberId, Long cursor, SaveTodoQueryRequest request) {
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new MemberNotFoundException(memberId));

        Slice<Todo> todoInfoSlice = todoRepository.findTodosUsingSingleCursor(cursor,
                TodoSearchCond.builder()
                        .member(member)
                        .type(TodoType.SAVE)
                        .build(),
                PageRequest.ofSize(request.size()));

        List<Todo> todos = todoInfoSlice.getContent();
        List<TodoInfo> todoInfos = todos.stream().map(TodoInfo::fromEntity).toList();

        if(todoInfos.isEmpty()){
            return new PageResponse<>(todoInfoSlice.hasNext(), null, todoInfos);
        }
        Todo lastTodo = todos.get(todos.size() - 1);

        return new PageResponse<>(todoInfoSlice.hasNext(), lastTodo.getId(), todoInfos);
    }

    @Transactional(readOnly = true)
    @Override
    public List<TodoInfo> findRandomRecommendTodos(Long memberId) {
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new MemberNotFoundException(memberId));
        List<Long> categoryIds = memberCategoryRepository.findCategoryIdsByMember(member);
        List<Todo> todos = todoRepository.findTodosWithCategoryByCategoryIdsAndType(categoryIds, TodoType.RECOMMEND);

        List<Todo> randomTodos = todoRandomSelector.selectTodos(5, todos);

        return TodoInfo.fromEntities(randomTodos);
    }

    @Transactional(readOnly = true)
    @Override
    public PageResponse<Cursor, List<TodoInfo>> findAllRecommendTodos(Cursor cursor, RecommendTodoQueryRequest request) {
        List<Category> categories = null;
        if(request.category() != null && !request.category().isEmpty()){
            categories = categoryRepository.findCategoriesByName(request.category());
        }

        List<TodoDifficulty> difficulties = null;
        if(request.difficulty() != null && !request.difficulty().isEmpty()){
            difficulties = request.difficulty().stream().map(TodoDifficulty::valueOf).toList();
        }

        Slice<Todo> todoInfoSlice = todoRepository.findTodosUsingCompositeCursor(cursor,
                TodoSearchCond.builder()
                        .type(TodoType.RECOMMEND)
                        .categories(categories)
                        .difficulties(difficulties)
                        .build(),
                PageRequest.ofSize(request.size()));

        List<Todo> todos = todoInfoSlice.getContent();
        List<TodoInfo> todoInfos = todos.stream().map(TodoInfo::fromEntity).toList();

        if(todoInfos.isEmpty()){
            return new PageResponse<>(todoInfoSlice.hasNext(), null, todoInfos);
        }
        Todo lastTodo = todos.get(todos.size() - 1);

        return new PageResponse<>(todoInfoSlice.hasNext(), Cursor.of(lastTodo.getCategory().getId(), lastTodo.getDifficulty(), lastTodo.getId()), todoInfos);
    }


    public List<TodoInfo> findTodosByPath(Long memberId, Long pathId){
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new MemberNotFoundException(memberId));

        if(member.getStatus() != Status.MOVE){
            throw new InvalidMemberStatusException(member.getStatus().name());
        }

        Path path = pathRepository.findById(pathId).orElseThrow(() -> new PathNotFoundException(pathId));

        List<Todo> todos = todoRepository.findTodosWithCategoryByPath(path);

        return todos.stream().map(TodoInfo::fromEntity).toList();
    }
}

