package com.dubu.backend.member.api;

import com.dubu.backend.global.domain.SuccessResponse;
import com.dubu.backend.member.application.MemberService;
import com.dubu.backend.member.dto.MemberOnboardingRequest;
import com.dubu.backend.member.dto.MemberStatusResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import static org.springframework.http.HttpStatus.NO_CONTENT;

@RestController
@RequiredArgsConstructor
@RequestMapping("/members")
public class MemberController {
    private final MemberService memberService;

    @ResponseStatus(NO_CONTENT)
    @PatchMapping("/onboarding")
    public void completeOnboarding(
            @RequestAttribute("memberId") Long memberId,
            @RequestBody MemberOnboardingRequest request) {

        memberService.completeOnboarding(memberId, request);
    }

    @GetMapping("/status")
    public SuccessResponse<MemberStatusResponse> getMemberStatus(
            @RequestAttribute("memberId") Long memberId
    ) {
        MemberStatusResponse response = memberService.getMemberStatus(memberId);

        return new SuccessResponse<>(response);
    }
}