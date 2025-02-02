package com.dubu.backend.member.exception;

import com.dubu.backend.global.exception.NotFoundException;

import static com.dubu.backend.global.exception.ErrorCode.MEMBER_NOT_FOUND;

public class MemberNotFoundException extends NotFoundException {
  public MemberNotFoundException(Long memberId) {
    super(MEMBER_NOT_FOUND.getMessage().formatted(memberId));
  }

  @Override
  public String getErrorCode() {
    return MEMBER_NOT_FOUND.name();
  }
}