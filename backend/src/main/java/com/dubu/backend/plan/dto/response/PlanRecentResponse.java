package com.dubu.backend.plan.dto.response;

import com.dubu.backend.plan.domain.Path;
import com.dubu.backend.plan.domain.Plan;
import com.dubu.backend.plan.domain.enums.TrafficType;
import com.dubu.backend.todo.entity.Todo;

import java.time.LocalDateTime;
import java.util.List;

public record PlanRecentResponse(
        Long planId,
        Integer totalSectionTime,
        LocalDateTime createdAt,
        List<PlanRecentResponse.PlanPathResponse> paths
) {
    public static PlanRecentResponse of(Plan plan, List<Path> paths) {
        return new PlanRecentResponse(
                plan.getId(),
                plan.getTotalTime(),
                plan.getCreatedAt(),
                paths.stream().map(PlanPathResponse::from).toList()
        );
    }

    public record PlanPathResponse(
            Long pathId,
            String trafficType,
            Integer sectionTime,
            Integer subwayCode,
            String busNumber,
            String startName,
            String endName,
            List<PlanRecentResponse.PathTodoResponse> todos
    ) {
        public static PlanPathResponse from(Path path) {
            return new PlanPathResponse(
                    path.getId(),
                    path.getTrafficType().name(),
                    path.getSectionTime(),
                    path.getTrafficType() == TrafficType.SUBWAY ? path.getPlan().getId().intValue() : null,
                    path.getTrafficType() == TrafficType.BUS ? path.getStartName() : null,
                    path.getStartName(),
                    path.getEndName(),
                    path.getTodos().stream().map(PathTodoResponse::from).toList()
            );
        }
    }

    public record PathTodoResponse(
            Long todoId,
            boolean isDone,
            String title,
            String category,
            String difficulty,
            String memo
    ) {
        public static PathTodoResponse from(Todo todo) {
            return new PathTodoResponse(
                    todo.getId(),
                    todo.getIsCompleted() == Boolean.TRUE,
                    todo.getTitle(),
                    todo.getCategory().getName(),
                    todo.getDifficulty().name(),
                    todo.getMemo()
            );
        }
    }
}