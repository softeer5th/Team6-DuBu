package com.dubu.backend.global.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ErrorCode {

    // Cookie
    NOT_FOUND_COOKIE("일치하는 쿠키가 없습니다."),
    INVALID_COOKIE("유효하지 않는 쿠키입니다."),

    // Common
    FIELD_ERROR("입력이 잘못되었습니다."),
    URL_PARAMETER_ERROR("입력이 잘못되었습니다."),
    METHOD_ARGUMENT_TYPE_MISMATCH("입력한 값의 타입이 잘못되었습니다."),
    NO_RESOURCE_FOUND("요청한 리소스를 찾을 수 없습니다."),
    METHOD_NOT_SUPPORTED("허용되지 않은 메서드입니다."),
    MEDIA_TYPE_NOT_SUPPORTED("허용되지 않은 미디어 타입입니다."),
    ALREADY_DISCONNECTED("이미 클라이언트에서 요청이 종료되었습니다."),
    INTERNAL_SERVER_ERROR("서버 오류가 발생했습니다. 관리자에게 문의하세요."),
    ;

    private final String message;
}