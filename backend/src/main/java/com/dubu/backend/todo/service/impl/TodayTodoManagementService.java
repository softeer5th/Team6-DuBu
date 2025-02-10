package com.dubu.backend.todo.service.impl;

import com.dubu.backend.member.domain.Member;
import com.dubu.backend.member.exception.MemberNotFoundException;
import com.dubu.backend.member.infra.repository.MemberRepository;
import com.dubu.backend.todo.dto.common.TodoIdentifier;
import com.dubu.backend.todo.dto.request.TodoCreateFromArchivedRequest;
import com.dubu.backend.todo.dto.request.TodoCreateRequest;
import com.dubu.backend.todo.dto.request.TodoUpdateRequest;
import com.dubu.backend.todo.dto.response.TodoInfo;
import com.dubu.backend.todo.dto.response.TodoManageResult;
import com.dubu.backend.todo.entity.*;
import com.dubu.backend.todo.exception.*;
import com.dubu.backend.todo.repository.CategoryRepository;
import com.dubu.backend.todo.repository.ScheduleRepository;
import com.dubu.backend.todo.repository.TodoRepository;
import com.dubu.backend.todo.service.TodoManagementService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
@Transactional
public class TodayTodoManagementService implements TodoManagementService {
    private final MemberRepository memberRepository;
    private final CategoryRepository categoryRepository;
    private final TodoRepository todoRepository;
    private final ScheduleRepository scheduleRepository;

    @Override
    public TodoManageResult<?> createTodo(TodoIdentifier identifier, TodoCreateRequest todoCreateRequest) {
        Member member = memberRepository.findById(identifier.memberId()).orElseThrow(() -> new MemberNotFoundException(identifier.memberId()));
        Category category = categoryRepository.findByName(todoCreateRequest.category()).orElseThrow(() -> new CategoryNotFoundException(todoCreateRequest.category()));
        Schedule schedule = scheduleRepository.findLatestSchedule(member, LocalDate.now()).orElseThrow(ScheduleNotFoundException::new);

        if(schedule.getTodos().size() == 3){
            throw new TodoLimitExceededException("오늘", 3);
        }

        Todo todo = todoCreateRequest.toEntity(member, category, schedule, null, TodoType.SCHEDULED);

        return TodoManageResult.of(false, TodoInfo.fromEntity(todoRepository.save(todo)));
    }

    @Override
    public TodoManageResult<?> createTodoFromArchived(TodoIdentifier identifier, TodoCreateFromArchivedRequest todoCreateRequest) {
        Member member = memberRepository.findById(identifier.memberId()).orElseThrow(() -> new MemberNotFoundException(identifier.memberId()));
        Schedule schedule = scheduleRepository.findLatestSchedule(member, LocalDate.now()).orElseThrow(ScheduleNotFoundException::new);

        if(schedule.getTodos().size() == 3){
            throw new TodoLimitExceededException("오늘" , 3);
        }
        Todo parentTodo = todoRepository.findWithCategoryById(todoCreateRequest.todoId()).orElseThrow(TodoNotFoundException::new);

        // 해당 할 일이 이미 추가됐는지 확인
        todoRepository.findByParentTodoAndSchedule(parentTodo, schedule).ifPresent(todo -> {throw new AlreadyAddedTodoFromArchivedException();});

        Todo newTodo = Todo.of(parentTodo.getTitle(), TodoType.SCHEDULED, parentTodo.getDifficulty(), parentTodo.getMemo(), member, parentTodo.getCategory(), parentTodo, schedule, null);

        Todo savedTodo = todoRepository.save(newTodo);
        return TodoManageResult.of(false, TodoInfo.fromEntity(savedTodo));
    }

    @Override
    public TodoManageResult<?> modifyTodo(TodoIdentifier identifier, TodoUpdateRequest todoUpdateRequest) {
        Member member = memberRepository.findById(identifier.memberId()).orElseThrow(() -> new MemberNotFoundException(identifier.memberId()));
        Todo todo = todoRepository.findWithCategoryById(identifier.todoId()).orElseThrow(TodoNotFoundException::new);

        // 제목, 카테고리, 난이도 수정 시 부모 할 일 관계 끊기
        if(todoUpdateRequest.title() != null || todoUpdateRequest.category() != null || todoUpdateRequest.difficulty() != null){
            todo.clearParentTodo();
        }
        // 수정
        Category category = null;
        if(todoUpdateRequest.category() != null){
            category = categoryRepository.findByName(todoUpdateRequest.category()).orElseThrow(() -> new CategoryNotFoundException(todoUpdateRequest.category()));
        }

        TodoDifficulty difficulty = null;
        if(todoUpdateRequest.difficulty() != null){
            difficulty = TodoDifficulty.valueOf(todoUpdateRequest.difficulty().toUpperCase());
        }

        todo.updateTodo(todoUpdateRequest.title(), category, difficulty, todoUpdateRequest.memo());

        return TodoManageResult.of(false, TodoInfo.fromEntity(todo));
    }

    @Override
    public TodoManageResult<?> removeTodo(TodoIdentifier identifier) {
        Member member = memberRepository.findById(identifier.memberId()).orElseThrow(() -> new MemberNotFoundException(identifier.memberId()));
        Todo todo = todoRepository.findById(identifier.todoId()).orElseThrow(TodoNotFoundException::new);

        todoRepository.delete(todo);

        return TodoManageResult.of(false, null);
    }
}
