package com.dubu.backend.auth.api;

import com.dubu.backend.auth.application.AuthService;
import com.dubu.backend.auth.domain.OauthProvider;
import com.dubu.backend.auth.dto.AccessTokenResponse;
import com.dubu.backend.auth.dto.TokenResponse;
import com.dubu.backend.global.config.JwtConfig;
import com.dubu.backend.global.domain.SuccessResponse;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController implements AuthApi {
    public static final long HOURS_IN_MINIUTES = 60 * 60L;

    private final JwtConfig jwtConfig;
    private final AuthService authService;

    @SneakyThrows
    @GetMapping("/{oauthProvider}")
    public void redirectAuthCodeRequestUrl(
            @PathVariable OauthProvider oauthProvider,
            HttpServletResponse response
    ) {
        String redirectUrl = authService.getAuthCodeRequestUrl(oauthProvider);
        response.sendRedirect(redirectUrl);
    }

    @PostMapping("/kakao-login")
    public SuccessResponse<AccessTokenResponse> kakaoCallback(
            @RequestBody Map<String, String> request,
            HttpServletResponse response
    ) {
        String code = request.get("code");
        TokenResponse tokenResponse = authService.issueTokenAfterKakaoLogin(code);

        Cookie cookie = new Cookie("REFRESH_TOKEN", tokenResponse.accessToken());
        cookie.setHttpOnly(true);
//        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setMaxAge((int)(jwtConfig.refreshTokenExpireTimeInHours() * HOURS_IN_MINIUTES));
        response.addCookie(cookie);

        return new SuccessResponse<>(new AccessTokenResponse(tokenResponse.accessToken()));
    }

    @PostMapping("/reissue")
    public SuccessResponse<AccessTokenResponse> reissue(HttpServletRequest request) {
        AccessTokenResponse response = authService.reissueToken(request);

        return new SuccessResponse<>(response);
    }

    @PostMapping("/test/token")
    public SuccessResponse<AccessTokenResponse> testToken() {
        AccessTokenResponse response = authService.issueTokenForTest();

        return new SuccessResponse<>(response);
    }
}