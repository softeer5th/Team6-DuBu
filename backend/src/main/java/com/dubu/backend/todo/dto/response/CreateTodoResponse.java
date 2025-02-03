package com.dubu.backend.todo.dto.response;


import com.dubu.backend.todo.entity.Todo;
import com.dubu.backend.todo.entity.TodoDifficulty;

public record CreateTodoResponse(Long todoId, String category, String difficulty, String title) {
    public CreateTodoResponse(Long todoId, String category, TodoDifficulty todoDifficulty, String title) {
        this(todoId, category, todoDifficulty.name(), title);
    }

    public static CreateTodoResponse fromEntity(Todo todo){
        return new CreateTodoResponse(todo.getId(), todo.getCategory().getName(), todo.getDifficulty(), todo.getTitle());
    }
}
