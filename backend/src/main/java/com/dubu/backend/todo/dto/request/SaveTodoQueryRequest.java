package com.dubu.backend.todo.dto.request;

import jakarta.annotation.Nullable;

public record SaveTodoQueryRequest(@Nullable Long cursor, int size) {
}
