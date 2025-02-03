package com.dubu.backend.todo.dto.request;

public record UpdateTodoRequest(String title, String category, String difficulty, String memo) {
}
