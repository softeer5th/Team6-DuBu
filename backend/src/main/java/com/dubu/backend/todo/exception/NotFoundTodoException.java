package com.dubu.backend.todo.exception;

import com.dubu.backend.global.exception.NotFoundException;

import static com.dubu.backend.global.exception.ErrorCode.TODO_NOT_FOUND;

public class NotFoundTodoException extends NotFoundException {
    public NotFoundTodoException() {
        super(TODO_NOT_FOUND.getMessage());
    }

    @Override
    public String getErrorCode() {
        return TODO_NOT_FOUND.name();
    }
}
