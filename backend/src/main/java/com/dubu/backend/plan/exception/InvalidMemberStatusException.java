package com.dubu.backend.plan.exception;

import com.dubu.backend.global.exception.BadRequestException;

import static com.dubu.backend.global.exception.ErrorCode.INVALID_MEMBER_STATUS;

public class InvalidMemberStatusException extends BadRequestException {
    public InvalidMemberStatusException(String memberStatus) {
        super(INVALID_MEMBER_STATUS.getMessage().formatted(memberStatus));
    }

    @Override
    public String getErrorCode() {
        return INVALID_MEMBER_STATUS.name();
    }
}