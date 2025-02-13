package com.dubu.backend.member.api;

import com.dubu.backend.global.domain.SuccessResponse;
import com.dubu.backend.member.application.MemberService;
import com.dubu.backend.member.dto.request.MemberInfoUpdateRequest;
import com.dubu.backend.member.dto.request.MemberOnboardingRequest;
import com.dubu.backend.member.dto.request.MemberStatusUpdateRequest;
import com.dubu.backend.member.dto.response.MemberInfoResponse;
import com.dubu.backend.member.dto.response.MemberSavedAddressResponse;
import com.dubu.backend.member.dto.response.MemberStatusResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.HttpStatus.NO_CONTENT;

@RestController
@RequiredArgsConstructor
@RequestMapping("/members")
public class MemberController implements MemberApi {
    private final MemberService memberService;

    @GetMapping
    public SuccessResponse<MemberInfoResponse> getMemberInfo(
            @RequestAttribute("memberId") Long memberId
    ) {
        MemberInfoResponse response = memberService.findMemberInfo(memberId);

        return new SuccessResponse<>(response);
    }

    @GetMapping("/status")
    public SuccessResponse<MemberStatusResponse> getMemberStatus(
            @RequestAttribute("memberId") Long memberId
    ) {
        MemberStatusResponse response = memberService.findMemberStatus(memberId);

        return new SuccessResponse<>(response);
    }

    @GetMapping("/address")
    public SuccessResponse<MemberSavedAddressResponse> getMemberSavedAddress(
            @RequestAttribute("memberId") Long memberId
    ) {
        MemberSavedAddressResponse response = memberService.findMemberSavedAddress(memberId);

        return new SuccessResponse<>(response);
    }

    @GetMapping("/category")
    public SuccessResponse<List<String>> getMemberCategory(
            @RequestAttribute("memberId") Long memberId
    ) {
        return new SuccessResponse<>(memberService.findMemberCategory(memberId));
    }

    @ResponseStatus(NO_CONTENT)
    @PatchMapping("/onboarding")
    public void completeOnboarding(
            @RequestAttribute("memberId") Long memberId,
            @RequestBody MemberOnboardingRequest request
    ) {
        memberService.completeOnboarding(memberId, request);
    }

    @PatchMapping
    public SuccessResponse<MemberInfoResponse> updateMemberInfo(
            @RequestAttribute("memberId") Long memberId,
            @RequestBody MemberInfoUpdateRequest request
    ) {
        MemberInfoResponse response = memberService.updateMemberInfo(memberId, request);

        return new SuccessResponse<>(response);
    }

    @ResponseStatus(NO_CONTENT)
    @PatchMapping("/status")
    public void updateMemberStatus(
            @RequestAttribute("memberId") Long memberId,
            @RequestBody MemberStatusUpdateRequest request
    ) {
        memberService.updateMemberStatus(memberId, request.status());
    }
}