package com.dubu.backend.global.exception;

public abstract class BadRequestException extends RuntimeException {

    public BadRequestException(String message) {
        super(message);
    }

    public abstract String getErrorCode();
}