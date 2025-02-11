package com.dubu.backend.todo.service.impl;

import com.dubu.backend.member.domain.Member;
import com.dubu.backend.member.domain.enums.Status;
import com.dubu.backend.member.exception.MemberNotFoundException;
import com.dubu.backend.member.infra.repository.MemberRepository;
import com.dubu.backend.plan.domain.Path;
import com.dubu.backend.plan.exception.InvalidMemberStatusException;
import com.dubu.backend.plan.exception.PathNotFoundException;
import com.dubu.backend.plan.infra.repository.PathRepository;
import com.dubu.backend.todo.dto.common.TodoIdentifier;
import com.dubu.backend.todo.dto.request.TodoCreateFromArchivedRequest;
import com.dubu.backend.todo.dto.request.TodoCreateRequest;
import com.dubu.backend.todo.dto.request.TodoUpdateRequest;
import com.dubu.backend.todo.dto.response.TodoInfo;
import com.dubu.backend.todo.dto.response.TodoManageResult;
import com.dubu.backend.todo.entity.Category;
import com.dubu.backend.todo.entity.Todo;
import com.dubu.backend.todo.entity.TodoDifficulty;
import com.dubu.backend.todo.entity.TodoType;
import com.dubu.backend.todo.exception.*;
import com.dubu.backend.todo.repository.CategoryRepository;
import com.dubu.backend.todo.repository.TodoRepository;
import com.dubu.backend.todo.service.TodoManagementService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class PathTodoManagementService implements TodoManagementService {
    private final MemberRepository memberRepository;
    private final TodoRepository todoRepository;
    private final CategoryRepository categoryRepository;
    private final PathRepository pathRepository;

    @Override
    public TodoManageResult<?> createTodo(TodoIdentifier identifier, TodoCreateRequest todoCreateRequest) {
        Member member = memberRepository.findById(identifier.memberId()).orElseThrow(() -> new MemberNotFoundException(identifier.memberId()));

        // 회원의 상태가 이동 중 이어야 한다.
        if(!member.getStatus().equals(Status.MOVE)){
            throw new InvalidMemberStatusException(member.getStatus().name());
        }

        Path path = pathRepository.findById(identifier.pathId()).orElseThrow(() -> new PathNotFoundException(identifier.pathId()));
        Category category = categoryRepository.findByName(todoCreateRequest.category()).orElseThrow(() -> new CategoryNotFoundException(todoCreateRequest.category()));

        List<Todo> todosByPath = todoRepository.findTodosByPath(path);

        if(todosByPath.size() == 10){
            throw new TodoLimitExceededException("경로별", 10);
        }

        Todo todo = todoCreateRequest.toEntity(member, category, null, path, TodoType.IN_PROGRESS);
        Todo savedTodo = todoRepository.save(todo);

        return TodoManageResult.of(false, TodoInfo.fromEntity(savedTodo));
    }

    @Override
    public TodoManageResult<?> createTodoFromArchived(TodoIdentifier identifier, TodoCreateFromArchivedRequest todoCreateRequest) {
        Member member = memberRepository.findById(identifier.memberId()).orElseThrow(() -> new MemberNotFoundException(identifier.memberId()));

        // 회원의 상태가 이동 중 이어야 한다.
        if(!member.getStatus().equals(Status.MOVE)){
            throw new InvalidMemberStatusException(member.getStatus().name());
        }

        Todo parentTodo = todoRepository.findWithCategoryById(todoCreateRequest.todoId()).orElseThrow(TodoNotFoundException::new);
        Path path = pathRepository.findById(identifier.pathId()).orElseThrow(() -> new PathNotFoundException(identifier.pathId()));

        List<Todo> todosByPath = todoRepository.findTodosByPath(path);

        if(todosByPath.size() == 10){
            throw new TodoLimitExceededException("경로별", 10);
        }

        todoRepository.findByParentTodoAndPath(parentTodo, path).ifPresent(todo ->{throw new AlreadyAddedTodoFromArchivedException();});
        Todo todo = Todo.of(parentTodo.getTitle(), TodoType.IN_PROGRESS, parentTodo.getDifficulty(), parentTodo.getMemo(), member, parentTodo.getCategory(), parentTodo, null, path);
        Todo savedTodo = todoRepository.save(todo);

        return TodoManageResult.of(false, TodoInfo.fromEntity(savedTodo));
    }

    @Override
    public TodoManageResult<?> modifyTodo(TodoIdentifier identifier, TodoUpdateRequest todoUpdateRequest) {
        Member member = memberRepository.findById(identifier.memberId()).orElseThrow(() -> new MemberNotFoundException(identifier.memberId()));

        // 회원의 상태가 이동 중 이어야 한다.
        if(!member.getStatus().equals(Status.MOVE)){
            throw new InvalidMemberStatusException(member.getStatus().name());
        }

        Todo todo = todoRepository.findWithCategoryById(identifier.todoId()).orElseThrow(TodoNotFoundException::new);

        // 할 일 타입과 요청 타입이 일치하지 않는다면
        if (!todo.getType().equals(TodoType.IN_PROGRESS)){
            throw new TodoTypeMismatchException(todo.getType(), TodoType.IN_PROGRESS);
        }


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

        // 회원의 상태가 이동 중 이어야 한다.
        if(!member.getStatus().equals(Status.MOVE)){
            throw new InvalidMemberStatusException(member.getStatus().name());
        }

        Todo todo = todoRepository.findById(identifier.todoId()).orElseThrow(TodoNotFoundException::new);

        // 할 일 타입과 요청 타입이 일치하지 않는다면
        if (!todo.getType().equals(TodoType.IN_PROGRESS)){
            throw new TodoTypeMismatchException(todo.getType(), TodoType.IN_PROGRESS);
        }

        todoRepository.delete(todo);

        return TodoManageResult.of(false, null);
    }
}
