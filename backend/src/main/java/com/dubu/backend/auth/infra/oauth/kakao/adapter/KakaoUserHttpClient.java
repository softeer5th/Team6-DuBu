package com.dubu.backend.auth.infra.oauth.kakao.adapter;

import com.dubu.backend.auth.domain.OauthProvider;
import com.dubu.backend.auth.infra.oauth.kakao.port.KakaoUserPort;
import com.dubu.backend.member.domain.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Component
@RequiredArgsConstructor
public class KakaoUserHttpClient implements KakaoUserPort {

    private final String KAKAO_USERINFO_API_URL = "https://kapi.kakao.com/v2/user/me";

    @Override
    public Member findUserFromKakao(String accessToken) {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + accessToken);

        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<Map> response = restTemplate.exchange(
                KAKAO_USERINFO_API_URL,
                HttpMethod.GET,
                entity,
                Map.class
        );

        String providerId = String.valueOf((response.getBody().get("id")));
        Map kakao_account = (Map) response.getBody().get("kakao_account");
        String email = (String) kakao_account.get("email");

        return Member.builder()
                .email(email)
                .oauthProvider(OauthProvider.valueOf("KAKAO"))
                .oauthProviderId(providerId)
                .build();
    }
}