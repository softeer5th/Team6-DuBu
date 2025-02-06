package com.dubu.backend.plan.infra.repository;

import com.dubu.backend.plan.domain.Plan;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PlanRepository extends JpaRepository<Plan, Long> {
    Optional<Plan> findTopByMemberIdOrderByCreatedAtDesc(Long memberId);
}