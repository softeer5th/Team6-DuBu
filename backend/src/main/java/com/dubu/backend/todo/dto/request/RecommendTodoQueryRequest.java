package com.dubu.backend.todo.dto.request;

import jakarta.annotation.Nullable;

import java.util.List;

public record RecommendTodoQueryRequest(
        @Nullable List<String> category,
        @Nullable List<String> difficulty,
        int size) {
}
