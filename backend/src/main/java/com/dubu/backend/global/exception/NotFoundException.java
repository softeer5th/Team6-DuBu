package com.dubu.backend.global.exception;

public abstract class NotFoundException extends RuntimeException {

    public NotFoundException(String message) {
        super(message);
    }

    public abstract String getErrorCode();
}