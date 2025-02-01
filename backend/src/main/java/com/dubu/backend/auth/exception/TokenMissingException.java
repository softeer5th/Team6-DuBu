package com.dubu.backend.auth.exception;

import com.dubu.backend.global.exception.UnauthorizedException;

import static com.dubu.backend.global.exception.ErrorCode.TOKEN_MISSING;

public class TokenMissingException extends UnauthorizedException {

    public TokenMissingException() {
        super(TOKEN_MISSING.getMessage());
    }

    @Override
    public String getErrorCode() {
        return TOKEN_MISSING.name();
    }
}