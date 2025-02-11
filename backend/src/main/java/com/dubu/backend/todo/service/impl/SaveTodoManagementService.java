package com.dubu.backend.todo.service.impl;

import com.dubu.backend.member.domain.Member;
import com.dubu.backend.member.domain.enums.Status;
import com.dubu.backend.member.exception.MemberNotFoundException;
import com.dubu.backend.member.infra.repository.MemberRepository;
import com.dubu.backend.plan.exception.InvalidMemberStatusException;
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
public class SaveTodoManagementService implements TodoManagementService {
    private final MemberRepository memberRepository;
    private final CategoryRepository categoryRepository;
    private final TodoRepository todoRepository;
    private final ScheduleRepository scheduleRepository;

    @Override
    public TodoManageResult<?> createTodo(TodoIdentifier identifier, TodoCreateRequest todoCreateRequest) {
        Member member = memberRepository.findById(identifier.memberId()).orElseThrow(() -> new MemberNotFoundException(identifier.memberId()));

        // 회원의 상태는 정지여야 한다.
        if(!member.getStatus().equals(Status.STOP)){
            throw new InvalidMemberStatusException(member.getStatus().name());
        }
        Category category = categoryRepository.findByName(todoCreateRequest.category()).orElseThrow(() -> new CategoryNotFoundException(todoCreateRequest.category()));

        Todo todo = todoCreateRequest.toEntity(member, category, null, null, TodoType.SAVE);
        Todo savedTodo = todoRepository.save(todo);

        return TodoManageResult.of(false, TodoInfo.fromEntity(savedTodo));
    }

    @Override
    public TodoManageResult<?> createTodoFromArchived(TodoIdentifier identifier, TodoCreateFromArchivedRequest todoCreateRequest) {
        Member member = memberRepository.findById(identifier.memberId()).orElseThrow(() -> new MemberNotFoundException(identifier.memberId()));

        // 회원의 상태는 정지여야 한다.
        if(!member.getStatus().equals(Status.STOP)){
            throw new InvalidMemberStatusException(member.getStatus().name());
        }

        Todo parentTodo = todoRepository.findWithCategoryById(todoCreateRequest.todoId()).orElseThrow(TodoNotFoundException::new);

        todoRepository.findByMemberAndParentTodoAndType(member, parentTodo, TodoType.SAVE).ifPresent(todo -> {throw new AlreadyAddedTodoFromArchivedException();});

        Todo todo = Todo.of(parentTodo.getTitle(), TodoType.SAVE, parentTodo.getDifficulty(), parentTodo.getMemo(), member, parentTodo.getCategory(), parentTodo, null, null);
        Todo savedTodo = todoRepository.save(todo);

        return TodoManageResult.of(false, TodoInfo.fromEntity(savedTodo));
    }

    @Override
    public TodoManageResult<?> modifyTodo(TodoIdentifier identifier, TodoUpdateRequest todoUpdateRequest) {
        Member member = memberRepository.findById(identifier.memberId()).orElseThrow(() -> new MemberNotFoundException(identifier.memberId()));

        // 회원의 상태는 정지여야 한다.
        if(!member.getStatus().equals(Status.STOP)){
            throw new InvalidMemberStatusException(member.getStatus().name());
        }

        Todo todo = todoRepository.findWithCategoryById(identifier.todoId()).orElseThrow(TodoNotFoundException::new);

        // 할 일 타입과 요청 타입이 일치하지 않는다면
        if (!todo.getType().equals(TodoType.SAVE)){
            throw new TodoTypeMismatchException(todo.getType(), TodoType.SAVE);
        }

        // 제목, 카테고리, 난이도를 수정하는 경우 관련된 부모 할 일 삭제
        if(todoUpdateRequest.title() != null || todoUpdateRequest.category() != null || todoUpdateRequest.difficulty() != null){
            // 내일 할 일 관련
            todoRepository.findWithScheduleByParentTodoAndScheduleDate(todo, LocalDate.now().plusDays(1)).ifPresent(Todo::clearParentTodo);

            // 오늘 할 일 관련
            Schedule todaySchedule = scheduleRepository.findLatestSchedule(member, LocalDate.now()).orElseThrow(ScheduleNotFoundException::new);
            todoRepository.findByParentTodoAndSchedule(todo, todaySchedule).ifPresent(Todo::clearParentTodo);

            // 해당 할 일 관련
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

        // 회원의 상태는 정지여야 한다.
        if(!member.getStatus().equals(Status.STOP)){
            throw new InvalidMemberStatusException(member.getStatus().name());
        }

        Todo todo = todoRepository.findById(identifier.todoId()).orElseThrow(TodoNotFoundException::new);

        // 할 일 타입과 요청 타입이 일치하지 않는다면
        if (!todo.getType().equals(TodoType.SAVE)){
            throw new TodoTypeMismatchException(todo.getType(), TodoType.SAVE);
        }

        // 즐겨찾기 할 일로 부터 생성된 오늘 할 일, 내일 할 일의 부모 id 제거
        todoRepository.findWithScheduleByParentTodoAndScheduleDate(todo, LocalDate.now().plusDays(1)).ifPresent(Todo::clearParentTodo);

        Schedule todaySchedule = scheduleRepository.findLatestSchedule(member, LocalDate.now()).orElseThrow(ScheduleNotFoundException::new);
        todoRepository.findByParentTodoAndSchedule(todo, todaySchedule).ifPresent(Todo::clearParentTodo);

        todoRepository.delete(todo);

        return TodoManageResult.of(false, null);
    }
}
