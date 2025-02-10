package com.dubu.backend.todo.dto.request;

import com.dubu.backend.member.domain.Member;
import com.dubu.backend.plan.domain.Path;
import com.dubu.backend.todo.entity.*;

public record TodoCreateRequest(String title, String category, String difficulty, String memo){

    public Todo toEntity(Member member, Category category, Schedule schedule, Path path, TodoType type){
        return Todo.builder()
                .title(title)
                .category(category)
                .difficulty(TodoDifficulty.valueOf(difficulty))
                .memo(memo)
                .member(member)
                .schedule(schedule)
                .path(path)
                .type(type)
                .build();
    }
}
