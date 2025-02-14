package com.dubu.backend.plan.api;

import com.dubu.backend.global.domain.SuccessResponse;
import com.dubu.backend.plan.application.PlanService;
import com.dubu.backend.plan.dto.request.PlanCreateRequest;
import com.dubu.backend.plan.dto.request.PlanFeedbackCreateRequest;
import com.dubu.backend.plan.dto.response.FeedbackWritePageInfoResponse;
import com.dubu.backend.plan.dto.response.PlanRecentResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/plans")
public class PlanController implements PlanApi {
    private final PlanService planService;

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public SuccessResponse<Map<String, Long>> createPlan(
            @RequestAttribute("memberId") Long memberId,
            @RequestBody PlanCreateRequest planCreateRequest
    ) {
        Long planId = planService.savePlan(memberId, planCreateRequest);

        return new SuccessResponse<>(Map.of("planId", planId));
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/{planId}/feedbacks")
    public void createPlanFeedback(
            @RequestAttribute("memberId") Long memberId,
            @PathVariable Long planId,
            @RequestBody PlanFeedbackCreateRequest planFeedbackCreateRequest
    ) {
        planService.savePlanFeedback(memberId, planId, planFeedbackCreateRequest);
    }

    @GetMapping("/recent")
    public SuccessResponse<PlanRecentResponse> getRecentPlan(
            @RequestAttribute("memberId") Long memberId
    ) {
        PlanRecentResponse response = planService.findRecentPlan(memberId);

        return new SuccessResponse<>(response);
    }

    @GetMapping("/feedbacks")
    public SuccessResponse<FeedbackWritePageInfoResponse> getFeedbackWritePageInfo(
            @RequestAttribute("memberId") Long memberId
    ) {
        FeedbackWritePageInfoResponse response = planService.findFeedbackWritePageInfo(memberId);

        return new SuccessResponse<>(response);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PatchMapping("/move-complete")
    public void completePlanMove(
            @RequestAttribute("memberId") Long memberId
    ) {
        planService.updateMoveStatusToFeedback(memberId);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping
    public void deletePlan(
            @RequestAttribute("memberId") Long memberId,
            @RequestParam("planId") Long planId
    ){
        planService.removePlan(memberId, planId);
    }
}