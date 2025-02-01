package com.dubu.backend.member.domain;

import com.dubu.backend.auth.domain.OauthProvider;
import com.dubu.backend.global.domain.BaseTimeEntity;
import com.dubu.backend.member.domain.enums.Role;
import com.dubu.backend.member.domain.enums.Status;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

@Entity
@Getter
@Builder
@DynamicInsert
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class Member extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long id;

    @Column(nullable = false)
    private String nickname;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private OauthProvider oauthProvider;

    private String providerId;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    @ColumnDefault("'USER'")
    private Role role;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    @ColumnDefault("'STOP'")
    private Status status;

    private String recentRoute;
}