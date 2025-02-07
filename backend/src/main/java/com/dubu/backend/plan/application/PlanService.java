package com.dubu.backend.plan.application;

import com.dubu.backend.member.domain.Member;
import com.dubu.backend.member.exception.MemberNotFoundException;
import com.dubu.backend.member.infra.repository.MemberRepository;
import com.dubu.backend.plan.domain.Path;
import com.dubu.backend.plan.domain.Plan;
import com.dubu.backend.plan.dto.request.PlanSaveRequest;
import com.dubu.backend.plan.infra.repository.PathRepository;
import com.dubu.backend.plan.infra.repository.PlanRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class PlanService {
    private final MemberRepository memberRepository;
    private final PlanRepository planRepository;
    private final PathRepository pathRepository;

    @Transactional
    public void savePlan(Long memberId, PlanSaveRequest planSaveRequest) {
        Member currentMember = memberRepository.findById(memberId)
                .orElseThrow(() -> new MemberNotFoundException(memberId));

        Plan newPlan = Plan.createPlan(currentMember, planSaveRequest.totalSectionTime());
        planRepository.save(newPlan);

        List<Path> paths = planSaveRequest.paths().stream()
                .map(pathRequest -> Path.createPath(newPlan, pathRequest))
                .toList();
        pathRepository.saveAll(paths);
    }
}

    public PlanRecentResponse findRecentPlan(Long memberId) {
        memberRepository.findById(memberId)
                .orElseThrow(() -> new MemberNotFoundException(memberId));

        Plan recentPlan = planRepository.findTopByMemberIdOrderByCreatedAtDesc(memberId)
                .orElseThrow(() -> new PlanNotFoundException());

        List<Path> paths = pathRepository.findByPlanWithTodosOrderByPathOrder(recentPlan);

        return PlanRecentResponse.of(recentPlan, paths);
    }
}