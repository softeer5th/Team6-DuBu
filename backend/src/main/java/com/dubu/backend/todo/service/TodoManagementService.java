package com.dubu.backend.todo.service;

import com.dubu.backend.todo.dto.request.CreateTodoRequest;
import com.dubu.backend.todo.dto.response.CreateTodoResponse;

public interface TodoManagementService {
    CreateTodoResponse createTodo(Long memberId, CreateTodoRequest createTodoRequest);
}
