package com.dubu.backend.todo.service;

import com.dubu.backend.todo.dto.response.TodoInfo;

import java.util.List;

public interface TodoQueryService {
    List<TodoInfo> findTodayTodos(Long memberId);
}
