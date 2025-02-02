package com.dubu.backend.member.infra.repository;

import com.dubu.backend.member.domain.MemberCategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberCategoryRepository extends JpaRepository<MemberCategory, Long> {
}
