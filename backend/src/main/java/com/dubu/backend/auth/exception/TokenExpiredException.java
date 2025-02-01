package com.dubu.backend.auth.exception;

import com.dubu.backend.global.exception.UnauthorizedException;

import static com.dubu.backend.global.exception.ErrorCode.TOKEN_EXPIRED;

public class TokenExpiredException extends UnauthorizedException {

    public TokenExpiredException() {
        super(TOKEN_EXPIRED.getMessage());
    }

    @Override
    public String getErrorCode() {
        return TOKEN_EXPIRED.name();
    }
}