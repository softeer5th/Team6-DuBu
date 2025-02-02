package com.dubu.backend.auth.application;

import com.dubu.backend.auth.domain.OauthProvider;
import com.dubu.backend.auth.domain.authcode.AuthCodeRequestUrlProviderComposite;
import com.dubu.backend.auth.dto.TokenResponse;
import com.dubu.backend.auth.infra.oauth.kakao.port.KakaoTokenPort;
import com.dubu.backend.auth.infra.oauth.kakao.port.KakaoUserPort;
import com.dubu.backend.member.domain.Member;
import com.dubu.backend.member.infra.repository.MemberRepository;
import jakarta.servlet.http.HttpServletRequest;
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

    public TokenResponse reissueToken(HttpServletRequest request) {
        String newAccessToken = tokenService.reissue(request);
        return new TokenResponse(newAccessToken);
    }

    @Transactional
    public TokenResponse issueTokenAfterKakaoLogin(String code) {
        String tokenFromKakao = kakaoTokenPort.getAccessTokenByCode(code);
        Member kakaoUser = kakaoUserPort.findUserFromKakao(tokenFromKakao);
        Member loginMember = memberRepository.findByProviderId(kakaoUser.getProviderId())
                        .orElseGet(() -> memberRepository.save(kakaoUser));
        String newAccessToken = tokenService.issue(loginMember.getId());

        return new TokenResponse(newAccessToken);
    }

    public TokenResponse issueTokenForTest() {
        String newAccessToken = tokenService.issue(1L);

        return new TokenResponse(newAccessToken);
    }
}
