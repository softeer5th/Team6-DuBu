package com.dubu.backend.todo.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "다른 할 일로부터 생성 요청")
public record TodoCreateFromArchivedRequest(
        @Schema(description = "할 일 ID", example = "9999") Long todoId) {
}
