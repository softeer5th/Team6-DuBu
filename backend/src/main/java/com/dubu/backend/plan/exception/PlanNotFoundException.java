package com.dubu.backend.plan.exception;

import com.dubu.backend.global.exception.NotFoundException;

import static com.dubu.backend.global.exception.ErrorCode.PLAN_NOT_FOUND;

public class PlanNotFoundException extends NotFoundException {
    public PlanNotFoundException() {
        super(PLAN_NOT_FOUND.getMessage());
    }

    @Override
    public String getErrorCode() {
      return PLAN_NOT_FOUND.name();
    }
}