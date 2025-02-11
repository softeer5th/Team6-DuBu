package com.dubu.backend.todo.service.impl;

import com.dubu.backend.global.domain.PageResponse;
import com.dubu.backend.member.domain.Member;
import com.dubu.backend.member.exception.MemberCategoryNotFoundException;
import com.dubu.backend.member.exception.MemberNotFoundException;
import com.dubu.backend.member.infra.repository.MemberCategoryRepository;
import com.dubu.backend.member.infra.repository.MemberRepository;
import com.dubu.backend.todo.dto.common.Cursor;
import com.dubu.backend.todo.dto.common.TodoIdentifier;
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
import java.util.HashSet;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TodayTodoQueryService implements TodoQueryService{
    private final MemberRepository memberRepository;
    private final MemberCategoryRepository memberCategoryRepository;
    private final CategoryRepository categoryRepository;
    private final TodoRepository todoRepository;
    private final ScheduleRepository scheduleRepository;

    private final TodoRandomSelector todoRandomSelector;

    @Override
    @Transactional
    public List<TodoInfo> findTargetTodos(TodoIdentifier identifier) {
        Member member = memberRepository.findById(identifier.memberId()).orElseThrow(() -> new MemberNotFoundException(identifier.memberId()));

        Schedule todaySchedule = scheduleRepository.findLatestSchedule(member, LocalDate.now()).orElseGet(() -> {
            Schedule newSchedule = Schedule.of(LocalDate.now(), member);
            List<Long> categoryIds = memberCategoryRepository.findCategoryIdsByMember(member);

            if(categoryIds.isEmpty()){
                throw new MemberCategoryNotFoundException(identifier.memberId());
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

    @Override
    public PageResponse<Long, List<TodoInfo>> findSaveTodos(TodoIdentifier identifier, Long cursor, SaveTodoQueryRequest request) {
        Member member = memberRepository.findById(identifier.memberId()).orElseThrow(() -> new MemberNotFoundException(identifier.memberId()));
        Schedule schedule = scheduleRepository.findLatestSchedule(member, LocalDate.now()).orElseThrow(ScheduleNotFoundException::new);

        Slice<Todo> todoSlice = todoRepository.findTodosUsingSingleCursor(cursor,
                TodoSearchCond.builder()
                        .member(member)
                        .type(TodoType.SAVE)
                        .build(),
                PageRequest.ofSize(request.size()));

        List<Todo> saveTodos = todoSlice.getContent();

        // 오늘 할 일 의 부모 할 일로 즐겨찾기 할 일이 있는지를 확인하고 있으면 hasChild = true, 없으면 hasChild = false 설정
        List<Long> parentIdsOfTodayTodos = todoRepository.findParentTodoIdsByParentTodosAndSchedule(saveTodos, schedule);
        HashSet<Long> parentIdOfTodayTodoSet = new HashSet<>(parentIdsOfTodayTodos);
        List<TodoInfo> todoInfos = saveTodos.stream()
                .map(t -> {
                    if (parentIdOfTodayTodoSet.contains(t.getId())) {
                        return TodoInfo.fromEntity(true, t);
                    }
                    return TodoInfo.fromEntity(false, t);
                }).toList();

        if(todoInfos.isEmpty()){
            return new PageResponse<>(todoSlice.hasNext(), null, todoInfos);
        }

        return new PageResponse<>(todoSlice.hasNext(), todoInfos.get(todoInfos.size() - 1).todoId(), todoInfos);
    }

    @Override
    public List<TodoInfo> findPersonalizedRecommendTodos(TodoIdentifier identifier) {
        Member member = memberRepository.findById(identifier.memberId()).orElseThrow(() -> new MemberNotFoundException(identifier.memberId()));
        Schedule schedule = scheduleRepository.findLatestSchedule(member, LocalDate.now()).orElseThrow(ScheduleNotFoundException::new);

        // 회원의 카테고리 정보에 해당하는 추천 할 일을 가져온다.
        List<Long> categoryIds = memberCategoryRepository.findCategoryIdsByMember(member);
        List<Todo> recommendTodos = todoRepository.findTodosWithCategoryByCategoryIdsAndType(categoryIds, TodoType.RECOMMEND);

        List<Todo> personalizedTodos = todoRandomSelector.selectTodos(5, recommendTodos);

        // 오늘 할 일 의 부모 할 일로 추천 할 일이 있는지를 확인하고 있으면 hasChild = true, 없으면 hasChild = false 설정
        List<Long> parentIdsOfTodayTodos = todoRepository.findParentTodoIdsByParentTodosAndSchedule(personalizedTodos, schedule);
        HashSet<Long> parentIdOfTodayTodoSet = new HashSet<>(parentIdsOfTodayTodos);

        return personalizedTodos.stream()
                .map(t -> {
                    if (parentIdOfTodayTodoSet.contains(t.getId())) {
                        return TodoInfo.fromEntity(true, t);
                    }
                    return TodoInfo.fromEntity(false, t);
                }).toList();
    }

    @Override
    public PageResponse<Cursor, List<TodoInfo>> findAllRecommendTodos(TodoIdentifier identifier, Cursor cursor, RecommendTodoQueryRequest request) {
        Member member = memberRepository.findById(identifier.memberId()).orElseThrow(() -> new MemberNotFoundException(identifier.memberId()));
        Schedule schedule = scheduleRepository.findLatestSchedule(member, LocalDate.now()).orElseThrow(ScheduleNotFoundException::new);

        List<Category> categories = null;
        if(request.category() != null && !request.category().isEmpty()){
            categories = categoryRepository.findCategoriesByName(request.category());
        }

        List<TodoDifficulty> difficulties = null;
        if(request.difficulty() != null && !request.difficulty().isEmpty()){
            difficulties = request.difficulty().stream().map(TodoDifficulty::valueOf).toList();
        }

        Slice<Todo> todoSlice = todoRepository.findTodosUsingCompositeCursor(cursor,
                TodoSearchCond.builder()
                        .type(TodoType.RECOMMEND)
                        .categories(categories)
                        .difficulties(difficulties)
                        .build(),
                PageRequest.ofSize(request.size()));

        List<Todo> recommendTodos = todoSlice.getContent();

        // 오늘 할 일 의 부모 할 일로 추천 할 일이 있는지를 확인하고 있으면 hasChild = true, 없으면 hasChild = false 설정
        List<Long> parentIdsOfTodayTodos = todoRepository.findParentTodoIdsByParentTodosAndSchedule(recommendTodos, schedule);
        HashSet<Long> parentIdOfTodayTodoSet = new HashSet<>(parentIdsOfTodayTodos);

        List<TodoInfo> todoInfos = recommendTodos.stream()
                .map(t -> {
                    if (parentIdOfTodayTodoSet.contains(t.getId())) {
                        return TodoInfo.fromEntity(true, t);
                    }
                    return TodoInfo.fromEntity(false, t);
                }).toList();

        if(todoInfos.isEmpty()){
            return new PageResponse<>(todoSlice.hasNext(), null, todoInfos);
        }
        Todo lastTodo = recommendTodos.get(recommendTodos.size() - 1);
        return new PageResponse<>(todoSlice.hasNext(), Cursor.of(lastTodo.getCategory().getId(), lastTodo.getDifficulty(), lastTodo.getId()), todoInfos);
    }
}
