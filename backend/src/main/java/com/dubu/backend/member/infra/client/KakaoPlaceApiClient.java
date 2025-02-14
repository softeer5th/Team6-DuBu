package com.dubu.backend.member.infra.client;

import com.dubu.backend.member.dto.response.KakaoPlaceApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

@Component
@RequiredArgsConstructor
public class KakaoPlaceApiClient {
    private final KakaoApiConfig kakaoApiConfig;

    public KakaoPlaceApiResponse searchPlaces(String query) {
        RestClient restClient = RestClient.builder()
                .baseUrl("https://dapi.kakao.com/v2/local/search/address.json")
                .defaultHeader("Authorization", "KakaoAK " + kakaoApiConfig.authorizationKey())
                .build();

        return restClient.get()
                .uri(uriBuilder -> uriBuilder
                        .queryParam("query", query)
                        .build())
                .retrieve()
                .body(KakaoPlaceApiResponse.class);
    }
}