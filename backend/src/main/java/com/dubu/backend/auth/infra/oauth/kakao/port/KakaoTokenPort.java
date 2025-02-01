package com.dubu.backend.auth.infra.oauth.kakao.port;

public interface KakaoTokenPort {
    String getAccessTokenByCode(String code);
}