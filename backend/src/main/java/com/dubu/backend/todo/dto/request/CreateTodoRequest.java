package com.dubu.backend.todo.dto.request;

import com.dubu.backend.member.domain.Member;
import com.dubu.backend.todo.entity.*;

public record CreateTodoRequest(String title, String category, String difficulty, String memo){

    public Todo toEntity(Member member, Category category, Schedule schedule, String todoType){
        return Todo.builder()
                .title(title)
                .category(category)
                .difficulty(TodoDifficulty.valueOf(difficulty))
                .memo(memo)
                .member(member)
                .schedule(schedule)
                .type(TodoType.get(todoType))
                .build();
    }
}
