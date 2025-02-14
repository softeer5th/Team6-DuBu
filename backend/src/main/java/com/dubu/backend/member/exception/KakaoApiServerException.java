package com.dubu.backend.member.exception;

import com.dubu.backend.global.exception.ServiceUnavailableException;

import static com.dubu.backend.global.exception.ErrorCode.KAKAO_SERVICE_UNAVAILABLE;

public class KakaoApiServerException extends ServiceUnavailableException {
    public KakaoApiServerException() {
        super(KAKAO_SERVICE_UNAVAILABLE.getMessage());
    }

    @Override
    public String getErrorCode() {
        return KAKAO_SERVICE_UNAVAILABLE.name();
    }
}