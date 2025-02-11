package com.dubu.backend.todo.repository;

import com.dubu.backend.todo.dto.common.Cursor;
import com.dubu.backend.todo.dto.search.TodoSearchCond;
import com.dubu.backend.todo.entity.Todo;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

public interface CustomTodoRepository {
    Slice<Todo> findTodosUsingSingleCursor(Long cursor, TodoSearchCond cond, Pageable pageable);
    Slice<Todo> findTodosUsingCompositeCursor(Cursor cursor, TodoSearchCond cond, Pageable pageable);
}
