package com.dubu.backend.todo.service;

import com.dubu.backend.todo.dto.request.CreateTodoFromArchivedRequest;
import com.dubu.backend.todo.dto.request.CreateTodoRequest;
import com.dubu.backend.todo.dto.response.CreateTodoResponse;

public interface TodoManagementService {
    CreateTodoResponse createTodo(Long memberId, String todoType, CreateTodoRequest createTodoRequest);
    CreateTodoResponse createTodoFromArchived(Long memberId, String todoType, CreateTodoFromArchivedRequest todoCreateRequest);

}
