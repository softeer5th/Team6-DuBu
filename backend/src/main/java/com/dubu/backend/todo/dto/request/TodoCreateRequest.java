package com.dubu.backend.todo.dto.request;

import com.dubu.backend.member.domain.Member;
import com.dubu.backend.todo.entity.*;

public record TodoCreateRequest(String title, String category, String difficulty, String memo){

    public Todo toEntity(Member member, Category category, Schedule schedule, TodoType type){
        return Todo.builder()
                .title(title)
                .category(category)
                .difficulty(TodoDifficulty.valueOf(difficulty))
                .memo(memo)
                .member(member)
                .schedule(schedule)
                .type(type)
                .build();
    }
}
