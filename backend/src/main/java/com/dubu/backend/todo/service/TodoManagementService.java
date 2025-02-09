package com.dubu.backend.todo.service;

import com.dubu.backend.todo.dto.request.TodoCreateFromArchivedRequest;
import com.dubu.backend.todo.dto.request.TodoCreateRequest;
import com.dubu.backend.todo.dto.request.TodoUpdateRequest;
import com.dubu.backend.todo.dto.response.TodoManageResult;

public interface TodoManagementService {
    TodoManageResult<?> createTodo(Long memberId, TodoCreateRequest todoCreateRequest);
    TodoManageResult<?> createTodoFromArchived(Long memberId, TodoCreateFromArchivedRequest todoCreateRequest);
    TodoManageResult<?> modifyTodo(Long memberId, Long todoId, TodoUpdateRequest todoUpdateRequest);
    TodoManageResult<?> removeTodo(Long memberId, Long todoId);
}
