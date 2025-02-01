package com.dubu.backend.auth.exception;

import com.dubu.backend.global.exception.BadRequestException;

import static com.dubu.backend.global.exception.ErrorCode.UNSUPPORTED_SOCIAL_LOGIN;

public class UnsupportedSocialLoginTypeException extends BadRequestException {
    public UnsupportedSocialLoginTypeException() {
        super(UNSUPPORTED_SOCIAL_LOGIN.getMessage());
    }

    @Override
    public String getErrorCode() {
        return UNSUPPORTED_SOCIAL_LOGIN.name();
    }
}