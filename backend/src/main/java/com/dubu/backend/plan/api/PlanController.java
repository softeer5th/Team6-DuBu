package com.dubu.backend.plan.api;

import com.dubu.backend.global.domain.SuccessResponse;
import com.dubu.backend.plan.application.PlanService;
import com.dubu.backend.plan.dto.request.PlanSaveRequest;
import com.dubu.backend.plan.dto.response.PlanRecentResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/plans")
public class PlanController {
    private final PlanService planService;

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public void savePlan(
            @RequestAttribute("memberId") Long memberId,
            @RequestBody PlanSaveRequest planSaveRequest
    ) {
        planService.savePlan(memberId, planSaveRequest);
    }

    @GetMapping("/recent")
    public SuccessResponse<PlanRecentResponse> getRecentPlan(
            @RequestAttribute("memberId") Long memberId
    ) {
        PlanRecentResponse response = planService.findRecentPlan(memberId);

        return new SuccessResponse<>(response);
    }
}