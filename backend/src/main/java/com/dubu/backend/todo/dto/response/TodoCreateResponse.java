package com.dubu.backend.todo.dto.response;


import com.dubu.backend.todo.entity.Todo;
import com.dubu.backend.todo.entity.TodoDifficulty;

public record TodoCreateResponse(Long todoId, String category, String difficulty, String title) {
    public TodoCreateResponse(Long todoId, String category, TodoDifficulty todoDifficulty, String title) {
        this(todoId, category, todoDifficulty.getName(), title);
    }

    public static TodoCreateResponse fromEntity(Todo todo){
        return new TodoCreateResponse(todo.getId(), todo.getCategory().getName(), todo.getTodoDifficulty(), todo.getTitle());
    }
}
