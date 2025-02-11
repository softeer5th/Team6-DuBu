package com.dubu.backend.member.dto.response;

import java.util.List;

public record MemberInfoResponse(
        String email,
        String nickName,
        List<String> categories,
        String homeAddress,
        String schoolAddress
) {
}