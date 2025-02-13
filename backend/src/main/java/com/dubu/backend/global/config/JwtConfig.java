package com.dubu.backend.global.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "jwt")
public record JwtConfig(
        String secret,
        long accessTokenExpireTimeInHours,
        long refreshTokenExpireTimeInHours
) {
}