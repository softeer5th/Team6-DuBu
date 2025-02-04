package com.dubu.backend.todo.service;

import com.dubu.backend.todo.dto.request.CreateTodoFromArchivedRequest;
import com.dubu.backend.todo.dto.request.CreateTodoRequest;
import com.dubu.backend.todo.dto.request.UpdateTodoRequest;
import com.dubu.backend.todo.dto.response.TodoInfo;

public interface TodoManagementService {
    TodoInfo createTodo(Long memberId, String todoType, CreateTodoRequest createTodoRequest);
    TodoInfo createTodoFromArchived(Long memberId, String todoType, CreateTodoFromArchivedRequest todoCreateRequest);
    TodoInfo modifyTodo(Long memberId, Long todoId, UpdateTodoRequest updateTodoRequest);
    void removeTodo(Long memberId, Long todoId);
}
