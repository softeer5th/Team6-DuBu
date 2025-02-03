package com.dubu.backend.todo.exception;

import com.dubu.backend.global.exception.NotFoundException;

import static com.dubu.backend.global.exception.ErrorCode.*;

public class NotFoundCategoryException extends NotFoundException {
    public NotFoundCategoryException() {
        super(CATEGORY_NOT_FOUND.getMessage());
    }

    @Override
    public String getErrorCode() {
        return CATEGORY_NOT_FOUND.name();
    }
}
