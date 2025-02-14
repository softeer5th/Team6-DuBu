package com.dubu.backend.plan.dto.response;

import com.dubu.backend.plan.domain.Plan;
import com.dubu.backend.todo.entity.Todo;

import java.util.List;

public record FeedbackWritePageInfoResponse(
        Long planId,
        Integer totalSectionTime,
        Integer totalTodoCount,
        List<FeedbackTodoResponse> todos
) {
    public static FeedbackWritePageInfoResponse of(Plan plan) {
        List<Todo> allTodos = plan.getPaths().stream()
                .flatMap(path -> path.getTodos().stream())
                .filter(Todo::getIsCompleted)
                .toList();

        return new FeedbackWritePageInfoResponse(
                plan.getId(),
                plan.getTotalTime(),
                allTodos.size(),
                allTodos.stream()
                        .map(FeedbackTodoResponse::of)
                        .toList()
        );
    }

    public record FeedbackTodoResponse(
            String category,
            String title
    ) {
        public static FeedbackTodoResponse of(Todo todo) {
            return new FeedbackTodoResponse(
                    todo.getCategory().getName(),
                    todo.getTitle()
            );
        }
    }
}