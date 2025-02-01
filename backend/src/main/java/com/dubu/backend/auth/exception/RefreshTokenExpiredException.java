package com.dubu.backend.auth.exception;

import com.dubu.backend.global.exception.UnauthorizedException;

import static com.dubu.backend.global.exception.ErrorCode.REFRESH_TOKEN_EXPIRED;

public class RefreshTokenExpiredException extends UnauthorizedException {
    public RefreshTokenExpiredException() {
        super(REFRESH_TOKEN_EXPIRED.getMessage().formatted());
    }

    @Override
    public String getErrorCode() {
        return REFRESH_TOKEN_EXPIRED.name();
    }
}
