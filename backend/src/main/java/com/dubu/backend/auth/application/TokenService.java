package com.dubu.backend.auth.application;

import com.dubu.backend.auth.exception.*;
import com.dubu.backend.auth.infra.repository.TokenRedisRepository;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Duration;

@Service
@RequiredArgsConstructor
public class TokenService {

    @Value("${jwt.expire.access-token-in-minutes}")
    private Duration accessTokenTime;
    @Value("${jwt.expire.refresh-token-in-minutes}")
    private Duration refreshTokenTime;
    private final JwtManager jwtManager;
    private final TokenRedisRepository tokenRedisRepository;

    public String issue(Long memberId) {
        String newAccessToken = jwtManager.createAccessToken(memberId, accessTokenTime.toMinutes());
        String newRefreshToken = jwtManager.createRefreshToken(memberId, refreshTokenTime.toMinutes());

        tokenRedisRepository.saveTokensToRedis(memberId.toString(), newAccessToken, newRefreshToken, refreshTokenTime);

        return newAccessToken;
    }

    public String reissue(HttpServletRequest request) {
        String accessToken = resolveToken(request);

        Claims claims = jwtManager.parseClaims(accessToken);

        String jti = claims.getId();
        String memberId = claims.getSubject();

        if (tokenRedisRepository.isBlacklisted(jti)) {
            throw new TokenBlacklistedException();
        }

        String refreshToken = tokenRedisRepository.getRefreshToken(memberId);
        if (refreshToken == null) {
            throw new RefreshTokenExpiredException();
        }

        String existingAccessToken = tokenRedisRepository.getAccessToken(refreshToken);
        if (existingAccessToken == null || !existingAccessToken.equals(accessToken)) {
            tokenRedisRepository.addBlacklistToken(jti);
            throw new TokenInvalidException();
        }

        tokenRedisRepository.addBlacklistToken(jti);

        String newAccessToken = jwtManager.createAccessToken(Long.parseLong(memberId), accessTokenTime.toMillis());

        tokenRedisRepository.storeAccessToken(refreshToken, newAccessToken, refreshTokenTime);

        return newAccessToken;
    }

    public Long validateToken(String token) {
        Claims claims = jwtManager.parseClaims(token);
        String jti = claims.getId();
        String memberId = claims.getSubject();

        if (tokenRedisRepository.isBlacklisted(jti)) {
            throw new TokenBlacklistedException();
        }

        String refreshToken = tokenRedisRepository.getRefreshToken(claims.getSubject());
        if (refreshToken == null) {
            throw new TokenExpiredException();
        }

        String existingAccessToken = tokenRedisRepository.getAccessToken(refreshToken);
        if (existingAccessToken == null || !existingAccessToken.equals(token)) {
            tokenRedisRepository.addBlacklistToken(jti);
            throw new TokenInvalidException();
        }

        return Long.parseLong(memberId);
    }

    public String resolveToken(HttpServletRequest request) {
        String jwtToken = request.getHeader("Authorization");
        if (jwtToken == null) {
            throw new TokenMissingException();
        }

        if (jwtToken.startsWith("Bearer ")) {
            return jwtToken.substring(7);
        } else {
            throw new TokenInvalidException();
        }
    }
}