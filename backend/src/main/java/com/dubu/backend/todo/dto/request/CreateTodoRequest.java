package com.dubu.backend.todo.dto.request;

import com.dubu.backend.member.domain.Member;
import com.dubu.backend.todo.entity.Category;
import com.dubu.backend.todo.entity.Todo;
import com.dubu.backend.todo.entity.TodoDifficulty;
import com.dubu.backend.todo.entity.TodoType;
import com.dubu.backend.todo.service.resolver.ScheduledDateResolver;

import java.time.LocalDate;

public record CreateTodoRequest(String title, String category, String difficulty, String memo){

    public Todo toEntity(/* Member member, */ Member member, String todoType, Category category){
        LocalDate scheduledDate = ScheduledDateResolver.resolveScheduledDate(todoType);

        return Todo.builder()
                .title(title)
                .category(category)
                .todoDifficulty(TodoDifficulty.getByName(difficulty))
                .memo(memo)
                .member(member)
                .scheduledDate(scheduledDate)
                .type(TodoType.get(todoType))
                .build();
    }
}
