package com.dubu.backend.plan.dto.request;

public record PlanFeedbackCreateRequest(
    String mood,
    String memo
) {
}