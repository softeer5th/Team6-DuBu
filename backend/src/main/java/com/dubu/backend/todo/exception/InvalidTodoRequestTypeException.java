package com.dubu.backend.todo.exception;

import com.dubu.backend.global.exception.BadRequestException;

import static com.dubu.backend.global.exception.ErrorCode.*;

public class InvalidTodoRequestTypeException extends BadRequestException {
    public InvalidTodoRequestTypeException(String message) {
        super(message.formatted(message));
    }

    @Override
    public String getErrorCode() {
        return INVALID_TODO_REQUEST_TYPE.name();
    }
}
