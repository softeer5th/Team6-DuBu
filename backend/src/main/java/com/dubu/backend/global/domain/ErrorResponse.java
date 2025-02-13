package com.dubu.backend.global.domain;

import com.dubu.backend.global.exception.BadRequestException;
import com.dubu.backend.global.exception.ErrorCode;
import com.dubu.backend.global.exception.NotFoundException;
import com.dubu.backend.global.exception.ServiceUnavailableException;
import com.dubu.backend.global.exception.UnauthorizedException;
import com.fasterxml.jackson.annotation.JsonInclude;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.Path;
import org.springframework.validation.BindingResult;

import java.util.List;
import java.util.Set;

import static com.fasterxml.jackson.annotation.JsonInclude.Include;

@Schema(description = "API 에러 응답")
public record ErrorResponse(
        @Schema(description = "에러 코드", example = "TODO_LIMIT_EXCEEDED")
        String errorCode,

        @Schema(description = "에러 메시지", example = "오늘 할 일은 최대 3개까지 추가할 수 있습니다.")
        String message,

        @JsonInclude(Include.NON_NULL)
        @Schema(description = "필드 오류 목록 (있을 경우)", example = "[{\"field\": \"todoName\", \"message\": \"이 필드는 필수입니다.\"}]")
        List<FieldError> fieldErrors,

        @JsonInclude(Include.NON_NULL)
        @Schema(description = "제약 조건 위반 오류 목록 (있을 경우)", example = "[{\"path\": \"dueDate\", \"message\": \"날짜는 반드시 현재보다 미래여야 합니다.\"}]")
        List<ConstraintViolationError> violationErrors
) {
    public <T extends BadRequestException> ErrorResponse(T e) {
        this(e.getErrorCode(), e.getMessage(), null, null);
    }

    public <T extends UnauthorizedException> ErrorResponse(T e) {
        this(e.getErrorCode(), e.getMessage(), null, null);
    }

    public <T extends NotFoundException> ErrorResponse(T e){
        this(e.getErrorCode(), e.getMessage(), null, null);
    }
    
    public <T extends ServiceUnavailableException> ErrorResponse(T e) {

        this(e.getErrorCode(), e.getMessage(), null, null);
    }

    public ErrorResponse(ErrorCode errorCode) {
        this(errorCode, null, null);
    }

    public ErrorResponse(ErrorCode errorCode, BindingResult bindingResult) {
        this(errorCode, FieldError.from(bindingResult), null);
    }

    public ErrorResponse(ErrorCode errorCode, Set<ConstraintViolation<?>> constraintViolations) {
        this(errorCode, null, ConstraintViolationError.from(constraintViolations));
    }

    private ErrorResponse(ErrorCode errorCode,
                          List<FieldError> fieldErrors,
                          List<ConstraintViolationError> violationErrors) {
        this(errorCode.name(), errorCode.getMessage(), fieldErrors, violationErrors);
    }

    private record FieldError(String field, Object rejectedValue, String reason) {

        private static List<FieldError> from(BindingResult bindingResult) {
            return bindingResult.getFieldErrors().stream()
                    .map(error -> new FieldError(
                            error.getField(),
                            error.getRejectedValue(),
                            error.getDefaultMessage())
                    )
                    .toList();
        }
    }

    private record ConstraintViolationError(String field, Object rejectedValue, String reason) {

        private static final int FIELD_POSITION = 1;

        private static List<ConstraintViolationError> from(Set<ConstraintViolation<?>> constraintViolations) {
            return constraintViolations.stream()
                    .map(constraintViolation -> new ConstraintViolationError(
                            getField(constraintViolation.getPropertyPath()),
                            constraintViolation.getInvalidValue().toString(),
                            constraintViolation.getMessage()))
                    .toList();
        }

        private static String getField(Path propertyPath) {
            return propertyPath.toString().split("\\.")[FIELD_POSITION];
        }
    }
}