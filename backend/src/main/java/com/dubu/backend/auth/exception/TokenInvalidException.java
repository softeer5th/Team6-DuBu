package com.dubu.backend.auth.exception;

import com.dubu.backend.global.exception.UnauthorizedException;

import static com.dubu.backend.global.exception.ErrorCode.TOKEN_INVALID;

public class TokenInvalidException extends UnauthorizedException {

    public TokenInvalidException() {
        super(TOKEN_INVALID.getMessage());
    }

    @Override
    public String getErrorCode() {
        return TOKEN_INVALID.name();
    }
}