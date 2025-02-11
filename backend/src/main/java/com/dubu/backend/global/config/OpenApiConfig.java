package com.dubu.backend.global.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.servers.Server;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;

import java.util.List;

@Configuration
@RequiredArgsConstructor
public class OpenApiConfig {
    private final Environment environment;

    @Bean
    public OpenAPI customOpenAPI() {
        final String securitySchemeName = "AccessToken";

        String activeProfile = environment.getProperty("spring.profiles.active", "local");

        String serverUrl = System.getenv("PROD_SERVER_URL");
        if (serverUrl == null || serverUrl.isBlank()) {
            serverUrl = "http://localhost:8080";
        }

        return new OpenAPI()
                .components(new Components()
                        .addSecuritySchemes(securitySchemeName,
                                new SecurityScheme()
                                        .type(SecurityScheme.Type.HTTP)
                                        .scheme("bearer")
                                        .bearerFormat("JWT")))
                .addSecurityItem(new SecurityRequirement().addList(securitySchemeName))
                .servers(List.of(new Server().url(serverUrl).description(activeProfile + " server")))
                .info(new Info().title("두리번 API Documentation")
                        .description("팀 두부의 두리번 서비스 API 문서입니다.")
                        .version("1.0"));
    }
}