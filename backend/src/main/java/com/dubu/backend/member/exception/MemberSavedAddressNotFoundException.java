package com.dubu.backend.member.exception;

import com.dubu.backend.global.exception.NotFoundException;

import static com.dubu.backend.global.exception.ErrorCode.MEMBER_SAVED_ADDRESS_NOT_FOUND;

public class MemberSavedAddressNotFoundException extends NotFoundException {
    public MemberSavedAddressNotFoundException(Long memberId) {
        super(MEMBER_SAVED_ADDRESS_NOT_FOUND.getMessage().formatted(memberId));
    }

    @Override
    public String getErrorCode() {
        return MEMBER_SAVED_ADDRESS_NOT_FOUND.name();
    }
}
