package com.dubu.backend.todo.exception;

import com.dubu.backend.global.exception.ErrorCode;
import com.dubu.backend.global.exception.InternalServerException;

public class CategoryException extends RuntimeException{
    private ErrorCode errorCode;

    public CategoryException(ErrorCode errorCode) {
        this.errorCode = errorCode;
    }
}
