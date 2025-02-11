package com.dubu.backend.member.exception;

import com.dubu.backend.global.exception.BadRequestException;

import static com.dubu.backend.global.exception.ErrorCode.INVALID_STATUS;

public class InvalidStatusException extends BadRequestException {
    public InvalidStatusException(String status) {
        super(INVALID_STATUS.getMessage().formatted(status));
    }

    @Override
    public String getErrorCode() {
        return INVALID_STATUS.name();
    }
}