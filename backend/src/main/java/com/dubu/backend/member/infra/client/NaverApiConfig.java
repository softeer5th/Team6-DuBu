package com.dubu.backend.member.infra.client;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "naver.client")
public record NaverApiConfig(
        String clientId,
        String clientSecret
) {
}