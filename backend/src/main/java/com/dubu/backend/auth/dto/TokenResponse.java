package com.dubu.backend.auth.dto;

import lombok.Builder;

@Builder
public record TokenResponse(String accessToken) {
}