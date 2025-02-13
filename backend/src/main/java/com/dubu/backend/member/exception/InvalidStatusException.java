package com.dubu.backend.member.exception;

import com.dubu.backend.global.exception.BadRequestException;

import static com.dubu.backend.global.exception.ErrorCode.INVALID_MEMBER_STATUS;

public class InvalidStatusException extends BadRequestException {
    public InvalidStatusException(String status) {
        super(INVALID_MEMBER_STATUS.getMessage().formatted(status));
    }

    @Override
    public String getErrorCode() {
        return INVALID_MEMBER_STATUS.name();
    }
}