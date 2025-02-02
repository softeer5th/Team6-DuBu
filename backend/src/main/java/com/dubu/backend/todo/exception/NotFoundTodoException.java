package com.dubu.backend.todo.exception;

import com.dubu.backend.global.exception.BadRequestException;
import com.dubu.backend.global.exception.ErrorCode;

import static com.dubu.backend.global.exception.ErrorCode.NOT_FOUND_TODO;

public class NotFoundTodoException extends BadRequestException {
    public NotFoundTodoException(String message) {
        super(NOT_FOUND_TODO.getMessage());
    }

    @Override
    public String getErrorCode() {
        return NOT_FOUND_TODO.name();
    }
}
