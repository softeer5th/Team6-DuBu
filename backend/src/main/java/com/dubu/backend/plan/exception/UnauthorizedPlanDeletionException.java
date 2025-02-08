package com.dubu.backend.plan.exception;

import com.dubu.backend.global.exception.UnauthorizedException;

import static com.dubu.backend.global.exception.ErrorCode.UNAUTHORIZED_PLAN_DELETION;

public class UnauthorizedPlanDeletionException extends UnauthorizedException {
    public UnauthorizedPlanDeletionException(Long memberId, Long planId) {
        super(UNAUTHORIZED_PLAN_DELETION.getMessage().formatted(memberId, planId));
    }

    @Override
    public String getErrorCode() {
        return UNAUTHORIZED_PLAN_DELETION.name();
    }
}
