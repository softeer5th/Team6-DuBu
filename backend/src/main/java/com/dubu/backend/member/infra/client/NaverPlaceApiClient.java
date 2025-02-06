package com.dubu.backend.member.infra.client;

import com.dubu.backend.member.dto.NaverPlaceApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

@Component
@RequiredArgsConstructor
public class NaverPlaceApiClient {
    private final NaverApiConfig naverApiConfig;

    public NaverPlaceApiResponse searchPlaces(String query) {
        RestClient restClient = RestClient.builder()
                .baseUrl("https://openapi.naver.com/v1/search/local.json")
                .defaultHeader("X-Naver-Client-Id", naverApiConfig.clientId())
                .defaultHeader("X-Naver-Client-Secret", naverApiConfig.clientSecret())
                .build();

        return restClient.get()
                .uri(uriBuilder -> uriBuilder
                        .queryParam("query", query)
                        .queryParam("display", 5)
                        .build())
                .retrieve()
                .body(NaverPlaceApiResponse.class);
    }
}