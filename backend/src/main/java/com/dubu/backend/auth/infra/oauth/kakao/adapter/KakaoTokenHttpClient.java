package com.dubu.backend.auth.infra.oauth.kakao.adapter;

import com.dubu.backend.auth.infra.oauth.kakao.KakaoOauthConfig;
import com.dubu.backend.auth.infra.oauth.kakao.port.KakaoTokenPort;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Component
@RequiredArgsConstructor
public class KakaoTokenHttpClient implements KakaoTokenPort {

    private final KakaoOauthConfig kakaoOauthConfig;

    private final String KAKAO_TOKEN_URL = "https://kauth.kakao.com/oauth/token";

    @Override
    public String getAccessTokenByCode(String code) {
        RestTemplate restTemplate = new RestTemplate();

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", kakaoOauthConfig.clientId());
        params.add("redirect_uri", kakaoOauthConfig.redirectUri());
        params.add("code", code);
        params.add("client_secret", kakaoOauthConfig.clientSecret());

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);

        ResponseEntity<Map> response = restTemplate.exchange(KAKAO_TOKEN_URL, HttpMethod.POST, request, Map.class);

        return (String) response.getBody().get("access_token");
    }
}