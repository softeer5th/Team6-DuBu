package com.dubu.backend.auth.application;

import com.dubu.backend.auth.dto.TokenResponse;
import com.dubu.backend.auth.exception.*;
import com.dubu.backend.auth.infra.repository.TokenRedisRepository;
import com.dubu.backend.global.config.JwtConfig;
import io.jsonwebtoken.Claims;
import jakarta.annotation.PostConstruct;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.Instant;
import java.util.Date;

@Service
@RequiredArgsConstructor
public class TokenService {
    public static final long HOURS_IN_MILLIS = 60 * 60 * 1000L;

    private final JwtConfig jwtConfig;
    private final JwtManager jwtManager;
    private final TokenRedisRepository tokenRedisRepository;
    private long accessTokenTime;
    private long refreshTokenTime;

    @PostConstruct
    public void init() {
        this.accessTokenTime = jwtConfig.accessTokenExpireTimeInHours() * HOURS_IN_MILLIS;
        this.refreshTokenTime = jwtConfig.refreshTokenExpireTimeInHours() * HOURS_IN_MILLIS;
    }

    public TokenResponse issue(Long memberId) {
        String newAccessToken = jwtManager.createAccessToken(memberId, accessTokenTime);
        String newRefreshToken = jwtManager.createRefreshToken(memberId, refreshTokenTime);

        tokenRedisRepository.saveRefreshToken(memberId.toString(), newRefreshToken, refreshTokenTime);

        return new TokenResponse(newAccessToken, newRefreshToken);
    }

    public TokenResponse reissue(String oldRefreshToken) {
        Claims claims = jwtManager.parseClaimsFromRefreshToken(oldRefreshToken);

        String jti = claims.getId();
        String memberId = claims.getSubject();

        if (tokenRedisRepository.isBlacklisted(jti)) {
            String currentRefreshToken = tokenRedisRepository.getRefreshToken(memberId);
            Date expiration = jwtManager.parseClaimsFromRefreshToken(currentRefreshToken).getExpiration();
            tokenRedisRepository.addBlacklistToken(currentRefreshToken, getRemainingDuration(expiration));

            throw new TokenBlacklistedException();
        }

        tokenRedisRepository.addBlacklistToken(jti, getRemainingDuration(claims.getExpiration()));

        TokenResponse tokenResponse = issue(Long.valueOf(memberId));

        return tokenResponse;
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

    private Duration getRemainingDuration(Date expiration) {
        Instant now = Instant.now();
        Instant expirationTime = expiration.toInstant();

        return Duration.between(now, expirationTime);
    }
}