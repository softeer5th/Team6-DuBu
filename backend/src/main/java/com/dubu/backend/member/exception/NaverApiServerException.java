package com.dubu.backend.member.exception;

import com.dubu.backend.global.exception.ServiceUnavailableException;

import static com.dubu.backend.global.exception.ErrorCode.NAVER_SERVICE_UNAVAILABLE;

public class NaverApiServerException extends ServiceUnavailableException {
    public NaverApiServerException() {
        super(NAVER_SERVICE_UNAVAILABLE.getMessage());
    }

    @Override
    public String getErrorCode() {
        return NAVER_SERVICE_UNAVAILABLE.name();
    }
}