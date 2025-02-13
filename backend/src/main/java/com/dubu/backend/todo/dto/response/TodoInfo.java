package com.dubu.backend.todo.dto.response;


import com.dubu.backend.todo.entity.Category;
import com.dubu.backend.todo.entity.Todo;
import com.dubu.backend.todo.entity.TodoDifficulty;
import com.fasterxml.jackson.annotation.JsonInclude;

import java.util.List;

import static com.fasterxml.jackson.annotation.JsonInclude.*;

public record TodoInfo(Long todoId, @JsonInclude(Include.NON_NULL) Boolean hasChild , String category, String difficulty, String title, String memo) {
    public TodoInfo(Long todoId, Boolean hasChild, Category category, TodoDifficulty todoDifficulty, String title, String memo) {
        this(todoId, hasChild, category.getName(), todoDifficulty.name(), title, memo);
    }

    public static TodoInfo fromEntity(Todo todo){
        return new TodoInfo(todo.getId(), null, todo.getCategory(), todo.getDifficulty(), todo.getTitle(), todo.getMemo());
    }

    public static TodoInfo fromEntity(boolean hasChild, Todo todo){
        return new TodoInfo(todo.getId(), hasChild, todo.getCategory(), todo.getDifficulty(), todo.getTitle(), todo.getMemo());
    }

    public static List<TodoInfo> fromEntities(List<Todo> todos){
        return todos.stream()
                .map(todo -> new TodoInfo(todo.getId(), null, todo.getCategory(), todo.getDifficulty(), todo.getTitle(), todo.getMemo())).toList();
    }
}
