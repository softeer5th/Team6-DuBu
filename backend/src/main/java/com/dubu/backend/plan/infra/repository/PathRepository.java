package com.dubu.backend.plan.infra.repository;

import com.dubu.backend.plan.domain.Path;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PathRepository extends JpaRepository<Path, Long> {
    List<Path> findByPlanIdOrderByPathOrderAsc(Long id);
}