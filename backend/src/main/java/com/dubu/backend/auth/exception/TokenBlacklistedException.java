package com.dubu.backend.auth.exception;

import com.dubu.backend.global.exception.UnauthorizedException;

import static com.dubu.backend.global.exception.ErrorCode.TOKEN_BLACKLISTED;

public class TokenBlacklistedException extends UnauthorizedException {

    public TokenBlacklistedException() {
        super(TOKEN_BLACKLISTED.getMessage());
    }

    @Override
    public String getErrorCode() {
        return TOKEN_BLACKLISTED.name();
    }
}