package com.dubu.backend.auth.application;

import com.dubu.backend.auth.exception.TokenInvalidException;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.UUID;

@Component
public class JwtManager {

    public static final String TOKEN_ISSUER = "DUBU";

    @Value("${jwt.secret}")
    private String secret;

    private SecretKey secretKey;

    @PostConstruct
    public void initKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secret);
        secretKey = Keys.hmacShaKeyFor(keyBytes);
    }

    public String createAccessToken(Long memberId, long accessTokenTime) {
        Claims claims = Jwts.claims().subject(memberId.toString()).build();
        Date now = new Date();

        return Jwts.builder()
                .issuer(TOKEN_ISSUER)
                .claims(claims)
                .issuedAt(now)
                .expiration(new Date(now.getTime() + accessTokenTime))
                .signWith(secretKey)
                .compact();
    }

    public String createRefreshToken(Long memberId, long refreshTokenTime) {
        Claims claims = Jwts.claims().subject(memberId.toString()).build();
        String jti = UUID.randomUUID().toString().substring(0, 16) + memberId;
        Date now = new Date();

        return Jwts.builder()
                .id(jti)
                .issuer(TOKEN_ISSUER)
                .claims(claims)
                .issuedAt(now)
                .expiration(new Date(now.getTime() + refreshTokenTime))
                .signWith(secretKey)
                .compact();
    }

    public Claims parseClaims(String token) {
        try {
            return Jwts.parser()
                    .requireIssuer(TOKEN_ISSUER)
                    .verifyWith(secretKey)
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();
        } catch (ExpiredJwtException ex) {
            return ex.getClaims();
        } catch (JwtException ex) {
            throw new TokenInvalidException();
        }
    }
}