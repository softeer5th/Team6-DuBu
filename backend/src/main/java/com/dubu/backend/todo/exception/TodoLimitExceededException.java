package com.dubu.backend.todo.exception;

import com.dubu.backend.global.exception.BadRequestException;

import static com.dubu.backend.global.exception.ErrorCode.*;

public class TodoLimitExceededException extends BadRequestException {
    public TodoLimitExceededException(String type, int num) {
        super(TODO_LIMIT_EXCEEDED.getMessage().formatted(type, num));
    }

    @Override
    public String getErrorCode() {
        return TODO_LIMIT_EXCEEDED.name();
    }
}
