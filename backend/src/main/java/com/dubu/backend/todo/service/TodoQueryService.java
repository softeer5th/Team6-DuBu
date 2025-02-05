package com.dubu.backend.todo.service;

import com.dubu.backend.global.domain.PageResponse;
import com.dubu.backend.todo.dto.request.SaveTodoQueryRequest;
import com.dubu.backend.todo.dto.response.TodoInfo;

import java.util.List;

public interface TodoQueryService {
    List<TodoInfo> findTodayTodos(Long memberId);
    List<TodoInfo> findTomorrowTodos(Long memberId);
    PageResponse<List<TodoInfo>> findFavoritesTodos(Long memberId, SaveTodoQueryRequest request);
}
