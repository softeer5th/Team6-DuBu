package com.dubu.backend.todo.service.impl;

import com.dubu.backend.global.domain.PageResponse;
import com.dubu.backend.member.domain.Member;
import com.dubu.backend.member.exception.MemberCategoryNotFoundException;
import com.dubu.backend.member.exception.MemberNotFoundException;
import com.dubu.backend.member.infra.repository.MemberCategoryRepository;
import com.dubu.backend.member.infra.repository.MemberRepository;
import com.dubu.backend.todo.dto.request.SaveTodoQueryRequest;
import com.dubu.backend.todo.dto.response.TodoInfo;
import com.dubu.backend.todo.entity.Schedule;
import com.dubu.backend.todo.entity.Todo;
import com.dubu.backend.todo.entity.TodoType;
import com.dubu.backend.todo.exception.ScheduleNotFoundException;
import com.dubu.backend.todo.repository.ScheduleRepository;
import com.dubu.backend.todo.repository.TodoRepository;
import com.dubu.backend.todo.service.TodoQueryService;
import com.dubu.backend.todo.support.TodoRandomSelector;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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

    private final TodoRandomSelector todoRandomSelector;

    @Transactional
    @Override
    public List<TodoInfo> findTodayTodos(Long memberId) {
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new MemberNotFoundException(memberId));

        Schedule todaySchedule = scheduleRepository.findLatestSchedule(member, LocalDate.now()).orElseGet(() -> {
            Schedule newSchedule = Schedule.of(LocalDate.now(), member);
            List<Long> categoryIds = memberCategoryRepository.findByMember(member);

            if(categoryIds.isEmpty()){
                throw new MemberCategoryNotFoundException(memberId);
            }
            List<Todo> todos = todoRepository.findTodosByCategoryIds(categoryIds);

            Todo recommendTodo = todoRandomSelector.selectOne(todos);

            Schedule savedSchedule = scheduleRepository.save(newSchedule);

            Todo newTodo = Todo.of(recommendTodo.getTitle(), TodoType.SCHEDULED, recommendTodo.getDifficulty(), null, member, recommendTodo.getCategory(), recommendTodo, newSchedule);
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
    public PageResponse<List<TodoInfo>> findSaveTodos(Long memberId, SaveTodoQueryRequest request) {
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new MemberNotFoundException(memberId));

        Pageable pageable = PageRequest.ofSize(request.size());

        Slice<TodoInfo> todoInfoSlice = todoRepository.findTodosByMemberWithCursor(request.cursor(), member, TodoType.SAVE,  pageable);

        List<TodoInfo> content = todoInfoSlice.getContent();

        if(content.isEmpty()){
            return new PageResponse<>(todoInfoSlice.hasNext(), null, content);
        }
        return new PageResponse<>(todoInfoSlice.hasNext(), content.get(content.size() - 1).todoId(), content);
    }
}

