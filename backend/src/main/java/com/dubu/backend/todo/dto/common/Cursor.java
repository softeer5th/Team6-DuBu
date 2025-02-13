package com.dubu.backend.todo.dto.common;

import com.dubu.backend.todo.entity.TodoDifficulty;
import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "커서 dto")
public record Cursor(
        @Schema(description = "커서 - 카테고리 ID", example = "1") Long cursorCategoryId,
        @Schema(description = "커서 - 난이도", example = "EASY") String cursorDifficulty,
        @Schema(description = "커서 - 할 일 ID", example = "125") Long cursorTodoId
        ) {
    public static Cursor of(Long cursorCategoryId, TodoDifficulty cursorDifficulty, Long cursorTodoId){
        return new Cursor(cursorCategoryId, cursorDifficulty.name(), cursorTodoId);
    }
}
