package com.dubu.backend.todo.service;

import com.dubu.backend.todo.dto.common.TodoIdentifier;
import com.dubu.backend.todo.dto.request.TodoCreateFromArchivedRequest;
import com.dubu.backend.todo.dto.request.TodoCreateRequest;
import com.dubu.backend.todo.dto.request.TodoUpdateRequest;
import com.dubu.backend.todo.dto.response.TodoManageResult;

public interface TodoManagementService {
    TodoManageResult<?> createTodo(TodoIdentifier identifier, TodoCreateRequest todoCreateRequest);
    TodoManageResult<?> createTodoFromArchived(TodoIdentifier identifier, TodoCreateFromArchivedRequest todoCreateRequest);
    TodoManageResult<?> modifyTodo(TodoIdentifier identifier, TodoUpdateRequest todoUpdateRequest);
    TodoManageResult<?> removeTodo(TodoIdentifier identifier);
}
