package com.dubu.backend.todo.exception;

import com.dubu.backend.global.exception.BadRequestException;

import static com.dubu.backend.global.exception.ErrorCode.*;

public class PathIdNotProvidedException extends BadRequestException {
    public PathIdNotProvidedException() {
        super(PATH_ID_NOT_PROVIDED.getMessage());
    }

    @Override
    public String getErrorCode() {
        return PATH_ID_NOT_PROVIDED.name();
    }
}
