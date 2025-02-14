package com.dubu.backend.auth.exception;

import com.dubu.backend.global.exception.UnauthorizedException;

import static com.dubu.backend.global.exception.ErrorCode.INVALID_TOKEN_HEADER;

public class InvalidTokenHeaderException extends UnauthorizedException {
    public InvalidTokenHeaderException() {
        super(INVALID_TOKEN_HEADER.getMessage());
    }

    @Override
    public String getErrorCode() {
        return INVALID_TOKEN_HEADER.name();
    }
}
