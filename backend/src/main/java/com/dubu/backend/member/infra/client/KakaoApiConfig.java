package com.dubu.backend.member.infra.client;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "kakao.client")
public record KakaoApiConfig(
        String authorizationKey
) {
}