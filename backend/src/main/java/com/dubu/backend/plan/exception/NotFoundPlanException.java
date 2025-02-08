package com.dubu.backend.plan.exception;

import com.dubu.backend.global.exception.NotFoundException;

import static com.dubu.backend.global.exception.ErrorCode.NOT_FOUND_PLAN;

public class NotFoundPlanException extends NotFoundException {
    public NotFoundPlanException() {
        super(NOT_FOUND_PLAN.getMessage().formatted(""));
    }

    public NotFoundPlanException(Long planId) {
        super(NOT_FOUND_PLAN.getMessage().formatted(planId));
    }

    @Override
    public String getErrorCode() {
      return NOT_FOUND_PLAN.name();
    }
}