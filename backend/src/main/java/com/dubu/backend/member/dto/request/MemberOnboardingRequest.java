package com.dubu.backend.member.dto.request;

import java.util.List;

public record MemberOnboardingRequest(
        List<String> categories,
        String homeAddress,
        double homeAddressX,
        double homeAddressY,
        String schoolAddress,
        double schoolAddressX,
        double schoolAddressY,
        String nickname
) {
}