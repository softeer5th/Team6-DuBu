package com.dubu.backend.todo.service;

import com.dubu.backend.todo.dto.common.TodoIdentifier;
import com.dubu.backend.todo.dto.response.TodoInfo;

import java.util.List;

public interface TargetTodoQueryService extends TodoQueryService{
    List<TodoInfo> findTargetTodos(TodoIdentifier identifier);
}
