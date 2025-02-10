package com.dubu.backend.todo.dto.common;

import com.dubu.backend.todo.entity.TodoDifficulty;
import jakarta.annotation.Nullable;

public record Cursor(
        @Nullable Long cursorCategoryId,
        @Nullable String cursorDifficulty,
        @Nullable Long cursorTodoId
        ) {
    public static Cursor of(Long cursorCategoryId, TodoDifficulty cursorDifficulty, Long cursorTodoId){
        return new Cursor(cursorCategoryId, cursorDifficulty.name(), cursorTodoId);
    }
}
