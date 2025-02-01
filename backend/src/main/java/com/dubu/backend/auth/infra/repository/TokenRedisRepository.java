package com.dubu.backend.auth.infra.repository;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

import java.time.Duration;

@Component
public class TokenRedisRepository {

    private final RedisTemplate<String, String> redisTemplate;

    public TokenRedisRepository(RedisTemplate<String, String> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    public void saveTokensToRedis(String memberId, String accessToken, String refreshToken, Duration refreshTokenTime) {
        redisTemplate.opsForValue().set(memberId, refreshToken, refreshTokenTime);
        redisTemplate.opsForValue().set(refreshToken, accessToken, refreshTokenTime);
    }

    public String getRefreshToken(String memberId) {
        return redisTemplate.opsForValue().get(memberId);
    }

    public String getAccessToken(String refreshToken) {
        return redisTemplate.opsForValue().get(refreshToken);
    }

    public void storeAccessToken(String refreshToken, String accessToken, Duration refreshTokenTime) {
        redisTemplate.opsForValue().set(refreshToken, accessToken, refreshTokenTime);
    }

    public boolean isBlacklisted(String jti) {
        return Boolean.TRUE.equals(redisTemplate.opsForSet().isMember("jti:blacklist", jti));
    }

    public void addBlacklistToken(String jti) {
        redisTemplate.opsForSet().add("jti:blacklist", jti);
    }
}