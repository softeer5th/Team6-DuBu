package com.dubu.backend.todo.dto.common;

import com.dubu.backend.todo.entity.TodoDifficulty;

public record Cursor(
        Long cursorCategoryId,
        String cursorDifficulty,
        Long cursorTodoId
        ) {
    public static Cursor of(Long cursorCategoryId, TodoDifficulty cursorDifficulty, Long cursorTodoId){
        return new Cursor(cursorCategoryId, cursorDifficulty.name(), cursorTodoId);
    }
}
