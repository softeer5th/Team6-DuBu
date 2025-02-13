package com.dubu.backend.todo.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "즐겨찾기 할일 조회 요청 dto")
public record SaveTodoQueryRequest(
        @Schema(description = "페이지 크기", example = "5") int size) {
}
