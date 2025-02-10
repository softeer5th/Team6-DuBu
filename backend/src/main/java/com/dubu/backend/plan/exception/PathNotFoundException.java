package com.dubu.backend.plan.exception;

import com.dubu.backend.global.exception.NotFoundException;

import static com.dubu.backend.global.exception.ErrorCode.*;

public class PathNotFoundException extends NotFoundException {
    public PathNotFoundException(Long pathId) {
        super(PATH_NOT_FOUND.getMessage().formatted(pathId));
    }

    @Override
    public String getErrorCode() {
        return PATH_NOT_FOUND.name();
    }
}
