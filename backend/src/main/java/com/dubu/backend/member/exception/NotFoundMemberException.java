package com.dubu.backend.member.exception;

import com.dubu.backend.global.exception.NotFoundException;

import static com.dubu.backend.global.exception.ErrorCode.*;

public class NotFoundMemberException extends NotFoundException {
    public NotFoundMemberException() {
        super(MEMBER_NOT_FOUND.getMessage());
    }

    @Override
    public String getErrorCode() {
        return MEMBER_NOT_FOUND.name();
    }
}
