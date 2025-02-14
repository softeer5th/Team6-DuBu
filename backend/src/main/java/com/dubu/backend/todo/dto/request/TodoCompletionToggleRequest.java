package com.dubu.backend.todo.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;

public record TodoCompletionToggleRequest(
        @Schema(description = "완료 체크 여부", example = "true") boolean isCompleted) {
}
