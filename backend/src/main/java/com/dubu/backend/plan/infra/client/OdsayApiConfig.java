package com.dubu.backend.plan.infra.client;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "odsay.client")
public record OdsayApiConfig(
    String apiKey
) {
}