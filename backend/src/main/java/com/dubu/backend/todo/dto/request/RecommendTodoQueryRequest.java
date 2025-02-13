package com.dubu.backend.todo.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.annotation.Nullable;

import java.util.List;

@Schema(description = "모든 할 일 조회 요청 dto")
public record RecommendTodoQueryRequest(
        @Schema(description = "카테고리들", example = "READING,NEWS") @Nullable List<String> category,
        @Schema(description = "난이도들", example = "EASY,NORMAL") @Nullable List<String> difficulty,
        @Schema(description = "페이지 크기", example = "5") int size) {
}
