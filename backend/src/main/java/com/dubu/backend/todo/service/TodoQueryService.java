package com.dubu.backend.todo.service;

import com.dubu.backend.global.domain.PageResponse;
import com.dubu.backend.todo.dto.common.Cursor;
import com.dubu.backend.todo.dto.request.RecommendTodoQueryRequest;
import com.dubu.backend.todo.dto.request.SaveTodoQueryRequest;
import com.dubu.backend.todo.dto.response.TodoInfo;

import java.util.List;

public interface TodoQueryService {
    List<TodoInfo> findTodayTodos(Long memberId);
    List<TodoInfo> findTomorrowTodos(Long memberId);
    PageResponse<Long, List<TodoInfo>> findSaveTodos(Long memberId, Long cursor, SaveTodoQueryRequest request);
    List<TodoInfo> findRandomRecommendTodos(Long memberId);
    PageResponse<Cursor, List<TodoInfo>> findAllRecommendTodos(Long memberId, Cursor cursor, RecommendTodoQueryRequest request);
}
