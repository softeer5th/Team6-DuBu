package com.dubu.backend.todo.exception;

import com.dubu.backend.global.exception.BadRequestException;
import com.dubu.backend.global.exception.ErrorCode;
import com.dubu.backend.global.exception.InternalServerException;

import static com.dubu.backend.global.exception.ErrorCode.*;

public class NotFoundCategoryException extends BadRequestException {
    public NotFoundCategoryException() {
        super(NOT_FOUND_CATEGORY.getMessage());
    }

    @Override
    public String getErrorCode() {
        return NOT_FOUND_CATEGORY.name();
    }
}
