package com.dubu.backend.todo.dto.response;


import com.dubu.backend.todo.entity.Category;
import com.dubu.backend.todo.entity.Todo;
import com.dubu.backend.todo.entity.TodoDifficulty;

public record TodoInfo(Long todoId, String category, String difficulty, String title, String memo) {
    public TodoInfo(Long todoId, Category category, TodoDifficulty todoDifficulty, String title, String memo) {
        this(todoId, category.getName(), todoDifficulty.name(), title, memo);
    }

    public static TodoInfo fromEntity(Todo todo){
        return new TodoInfo(todo.getId(), todo.getCategory(), todo.getDifficulty(), todo.getTitle(), todo.getMemo());
    }
}
