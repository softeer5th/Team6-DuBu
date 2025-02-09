package com.dubu.backend.todo.dto.request;

public record TodoUpdateRequest(String title, String category, String difficulty, String memo) {
}
