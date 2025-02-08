package com.dubu.backend.plan.infra.client;


import com.dubu.backend.plan.dto.response.OdsayRouteApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

@Component
@RequiredArgsConstructor
public class OdsayApiClient {
    private final OdsayApiConfig odsayApiConfig;

    public OdsayRouteApiResponse searchPublicTransportRoute(Double startX, Double startY, Double endX, Double endY) {
        RestClient restClient = RestClient.builder()
                .baseUrl("https://api.odsay.com/v1/api/searchPubTransPathT")
                .build();

        return restClient.get()
                .uri(uriBuilder -> uriBuilder
                        .queryParam("apiKey", odsayApiConfig.apiKey())
                        .queryParam("SX", startX)
                        .queryParam("SY", startY)
                        .queryParam("EX", endX)
                        .queryParam("EY", endY)
                        .build())
                .retrieve()
                .body(OdsayRouteApiResponse.class);
    }
}