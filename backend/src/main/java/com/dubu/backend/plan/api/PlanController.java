package com.dubu.backend.plan.api;

import com.dubu.backend.plan.application.PlanService;
import com.dubu.backend.plan.dto.request.PlanSaveRequest;
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
            PlanSaveRequest planSaveRequest
    ) {
        planService.savePlan(memberId, planSaveRequest);
    }
}