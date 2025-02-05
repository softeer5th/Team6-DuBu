package com.dubu.backend.member.infra.repository;

import com.dubu.backend.member.domain.Member;
import com.dubu.backend.member.domain.MemberCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MemberCategoryRepository extends JpaRepository<MemberCategory, Long> {
    @Query("SELECT mc.category.id FROM MemberCategory mc WHERE mc.member = :member")
    List<Long> findByMember(@Param("member") Member member);
}
