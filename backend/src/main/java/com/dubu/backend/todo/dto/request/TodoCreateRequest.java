package com.dubu.backend.todo.dto.request;

import com.dubu.backend.todo.entity.Category;
import com.dubu.backend.todo.entity.Todo;
import com.dubu.backend.todo.entity.TodoDifficulty;
import com.dubu.backend.todo.entity.TodoType;

import java.time.LocalDate;

public record TodoCreateRequest(String title, String category, String difficulty, String memo){

    public Todo toEntity(/* Member member, */ Category category){
        return Todo.builder()
                .title(title)
                .category(category)
                .todoDifficulty(TodoDifficulty.getByName(difficulty))
                .memo(memo)
                //.member(member) 멤버 엔티티 아직 구현 X
                .scheduledDate(LocalDate.now())
                .type(TodoType.OTHER)
                .build();
    }
}
