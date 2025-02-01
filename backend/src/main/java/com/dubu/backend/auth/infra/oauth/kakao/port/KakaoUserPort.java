package com.dubu.backend.auth.infra.oauth.kakao.port;

import com.dubu.backend.member.domain.Member;

public interface KakaoUserPort {
    Member findUserFromKakao(String accessToken);
}