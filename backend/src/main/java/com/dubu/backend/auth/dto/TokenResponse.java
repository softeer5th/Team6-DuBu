package com.dubu.backend.auth.dto;

public record TokenResponse(
        String accessToken,
        String refreshToken
) {
}