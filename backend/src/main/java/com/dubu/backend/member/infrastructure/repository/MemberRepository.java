package com.dubu.backend.member.infrastructure.repository;

import com.dubu.backend.member.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Integer> {
    Optional<Member> findByProviderId(String providerId);
}
