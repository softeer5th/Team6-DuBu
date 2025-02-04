package com.dubu.backend.todo.exception;

import com.dubu.backend.global.exception.NotFoundException;

import static com.dubu.backend.global.exception.ErrorCode.TODO_NOT_FOUND;

public class TodoNotFoundException extends NotFoundException {
    public TodoNotFoundException() {
        super(TODO_NOT_FOUND.getMessage());
    }

    @Override
    public String getErrorCode() {
        return TODO_NOT_FOUND.name();
    }
}
