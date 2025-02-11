package com.dubu.backend.global.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

import static org.springframework.http.HttpStatus.*;

@Getter
@RequiredArgsConstructor
public enum ErrorCode {

    // Common
    FIELD_ERROR(BAD_REQUEST,"입력이 잘못되었습니다."),
    URL_PARAMETER_ERROR(BAD_REQUEST,"입력이 잘못되었습니다."),
    METHOD_ARGUMENT_TYPE_MISMATCH(BAD_REQUEST,"입력한 값의 타입이 잘못되었습니다."),
    ALREADY_DISCONNECTED(BAD_REQUEST,"이미 클라이언트에서 요청이 종료되었습니다."),
    NOT_FOUND_COOKIE(BAD_REQUEST,"일치하는 쿠키가 없습니다."),
    NO_RESOURCE_FOUND(NOT_FOUND,"요청한 리소스를 찾을 수 없습니다."),
    METHOD_NOT_SUPPORTED(METHOD_NOT_ALLOWED,"허용되지 않은 메서드입니다."),
    MEDIA_TYPE_NOT_SUPPORTED(UNSUPPORTED_MEDIA_TYPE,"허용되지 않은 미디어 타입입니다."),
    SERVER_ERROR(INTERNAL_SERVER_ERROR,"서버 오류가 발생했습니다. 관리자에게 문의하세요."),

    // Token
    TOKEN_INVALID(UNAUTHORIZED, "유효하지 않은 토큰입니다. 다시 로그인해 주세요."),
    TOKEN_MISSING(UNAUTHORIZED, "토큰이 요청 헤더에 없습니다."),
    TOKEN_BLACKLISTED(UNAUTHORIZED, "해당 토큰은 사용이 금지되었습니다. 다시 로그인해 주세요."),
    TOKEN_EXPIRED(UNAUTHORIZED, "토큰이 만료되었습니다. 새로운 토큰을 발급받으세요."),
    REFRESH_TOKEN_EXPIRED(UNAUTHORIZED, "세션이 만료되었습니다. 다시 로그인해 주세요."),

    // OAuth
    UNSUPPORTED_SOCIAL_LOGIN(BAD_REQUEST, "지원하지 않는 소셜 로그인 타입입니다."),

    // Member
    INVALID_MEMBER_STATUS(BAD_REQUEST, "회원의 상태가 %s인 경우 해당 API를 이용할 수 없습니다."),
    MEMBER_NOT_FOUND(NOT_FOUND, "회원을 찾을 수 없습니다. memberId : %d"),

    // Address
    MEMBER_SAVED_ADDRESS_NOT_FOUND(NOT_FOUND, "회원이 저장한 주소를 찾을 수 없습니다. memberId : %d"),

    // Category
    CATEGORY_NOT_FOUND(NOT_FOUND, "카테고리를 찾을 수 없습니다. categoryName : %s"),

    // Plan
    NOT_FOUND_PLAN(NOT_FOUND, "계획을 찾을 수 없습니다. planId : %d"),
    UNAUTHORIZED_PLAN_DELETION(UNAUTHORIZED, "회원이 해당 계획에 접근 권한이 없어 삭제할 수 없습니다. memberId : %d, planId : %d"),

    // Feedback
    INVALID_MOOD(BAD_REQUEST, "유효하지 않은 기분 형식입니다. mood : %s"),

    // Path
    PATH_NOT_FOUND(NOT_FOUND, "경로를 찾을 수 없습니다. pathId : %d"),
    PATH_ID_NOT_PROVIDED(BAD_REQUEST, "경로 아이디가 누락되었습니다."),
    INVALID_TRAFFIC_TYPE(BAD_REQUEST, "지원하지 않는 대중교통 형식입니다. trafficType : %s"),

    // Member_Category
    MEMBER_CATEGORY_NOT_FOUND(NOT_FOUND, "회원의 카테고리 정보를 찾을 수 없습니다. memberId : %d"),

    // Todo
    TODO_NOT_FOUND(NOT_FOUND, "해당 할 일이 존재하지 않습니다."),
    ALREADY_ADDED_TODO(BAD_REQUEST, "이미 추가된 할 일 입니다."),
    TODO_LIMIT_EXCEEDED(BAD_REQUEST, "%s 할 일은 최대 %d 개까지 추가할 수 있습니다."),

    INVALID_TODO_REQUEST_TYPE(BAD_REQUEST, "잘못된 할 일 요청 유형입니다. type = %s"),

    // Schedule
    SCHEDULE_NOT_FOUND(NOT_FOUND, "스케줄을 찾을 수 없습니다."),

    // External API
    NAVER_SERVICE_UNAVAILABLE(SERVICE_UNAVAILABLE, "네이버 API 서버가 장애 상태입니다."),
    ;

    public final HttpStatus httpStatus;
    private final String message;
}