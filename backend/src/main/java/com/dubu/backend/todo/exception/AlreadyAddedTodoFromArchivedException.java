package com.dubu.backend.todo.exception;

import com.dubu.backend.global.exception.BadRequestException;

import static com.dubu.backend.global.exception.ErrorCode.*;

public class AlreadyAddedTodoFromArchivedException extends BadRequestException {
    public AlreadyAddedTodoFromArchivedException() {
        super(ALREADY_ADDED_TODO.getMessage());
    }

    @Override
    public String getErrorCode() {
        return ALREADY_ADDED_TODO.name();
    }
}
