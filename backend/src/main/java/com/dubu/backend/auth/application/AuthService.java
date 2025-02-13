package com.dubu.backend.auth.application;

import com.dubu.backend.auth.domain.OauthProvider;
import com.dubu.backend.auth.domain.authcode.AuthCodeRequestUrlProviderComposite;
import com.dubu.backend.auth.dto.AccessTokenResponse;
import com.dubu.backend.auth.dto.TokenResponse;
import com.dubu.backend.auth.infra.oauth.kakao.port.KakaoTokenPort;
import com.dubu.backend.auth.infra.oauth.kakao.port.KakaoUserPort;
import com.dubu.backend.member.domain.Member;
import com.dubu.backend.member.infra.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {
    private final TokenService tokenService;
    private final KakaoTokenPort kakaoTokenPort;
    private final KakaoUserPort kakaoUserPort;
    private final MemberRepository memberRepository;
    private final AuthCodeRequestUrlProviderComposite authCodeRequestUrlProviderComposite;

    public String getAuthCodeRequestUrl(OauthProvider oauthProvider) {
        return authCodeRequestUrlProviderComposite.provide(oauthProvider);
    }

    public TokenResponse reissueToken(String oldRefreshToken) {
        TokenResponse tokenResponse = tokenService.reissue(oldRefreshToken);

        return tokenResponse;
    }

    @Transactional
    public TokenResponse issueTokenAfterKakaoLogin(String code) {
        String tokenFromKakao = kakaoTokenPort.getAccessTokenByCode(code);
        Member kakaoUser = kakaoUserPort.findUserFromKakao(tokenFromKakao);
        Member loginMember = memberRepository.findByOauthProviderId(kakaoUser.getOauthProviderId())
                        .orElseGet(() -> memberRepository.save(kakaoUser));

        TokenResponse tokenResponse = tokenService.issue(loginMember.getId());

        return tokenResponse;
    }

    public AccessTokenResponse issueTokenForTest() {
        TokenResponse tokenResponse = tokenService.issue(1L);

        return new AccessTokenResponse(tokenResponse.accessToken());
    }
}