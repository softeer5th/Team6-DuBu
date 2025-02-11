package com.dubu.backend.plan.infra.repository;

import com.dubu.backend.plan.domain.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
}