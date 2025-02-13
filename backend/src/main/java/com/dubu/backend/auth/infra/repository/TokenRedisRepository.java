package com.dubu.backend.auth.infra.repository;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

import java.time.Duration;
import java.util.concurrent.TimeUnit;

@Component
public class TokenRedisRepository {

    private final RedisTemplate<String, String> redisTemplate;

    public TokenRedisRepository(RedisTemplate<String, String> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    public void saveRefreshToken(String memberId, String refreshToken, long refreshTokenTime) {
        redisTemplate.opsForValue().set(memberId, refreshToken, refreshTokenTime, TimeUnit.MILLISECONDS);
    }

    public String getRefreshToken(String memberId) {
        return redisTemplate.opsForValue().get(memberId);
    }

    public boolean isBlacklisted(String jti) {
        return Boolean.TRUE.equals(redisTemplate.opsForSet().isMember("jti:blacklist", jti));
    }

    public void addBlacklistToken(String jti, Duration expiration) {
        redisTemplate.opsForValue().set("blacklist:" + jti, jti, expiration);
    }
}