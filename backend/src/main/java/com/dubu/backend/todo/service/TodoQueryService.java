package com.dubu.backend.todo.service;

import com.dubu.backend.global.domain.PageResponse;
import com.dubu.backend.todo.dto.common.Cursor;
import com.dubu.backend.todo.dto.common.TodoIdentifier;
import com.dubu.backend.todo.dto.request.RecommendTodoQueryRequest;
import com.dubu.backend.todo.dto.request.SaveTodoQueryRequest;
import com.dubu.backend.todo.dto.response.TodoInfo;

import java.util.List;

public interface TodoQueryService {
    PageResponse<Long, List<TodoInfo>> findSaveTodos(TodoIdentifier identifier, Long cursor, SaveTodoQueryRequest request);
    List<TodoInfo> findPersonalizedRecommendTodos(TodoIdentifier identifier);
    PageResponse<Cursor, List<TodoInfo>> findAllRecommendTodos(TodoIdentifier identifier, Cursor cursor, RecommendTodoQueryRequest request);
}
