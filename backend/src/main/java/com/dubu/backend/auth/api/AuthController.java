package com.dubu.backend.auth.api;

import com.dubu.backend.auth.application.AuthService;
import com.dubu.backend.auth.domain.OauthProvider;
import com.dubu.backend.auth.dto.TokenResponse;
import com.dubu.backend.global.domain.SuccessResponse;
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
public class AuthController {
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
    public SuccessResponse<TokenResponse> kakaoCallback(@RequestBody Map<String, String> request) {
        String code = request.get("code");
        TokenResponse response = authService.issueTokenAfterKakaoLogin(code);

        return new SuccessResponse<>(response);
    }

    @PostMapping("/reissue")
    public SuccessResponse<TokenResponse> reissue(HttpServletRequest request) {
        TokenResponse response = authService.reissueToken(request);

        return new SuccessResponse<>(response);
    }
}