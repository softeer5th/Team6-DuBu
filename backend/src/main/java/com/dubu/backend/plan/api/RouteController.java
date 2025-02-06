package com.dubu.backend.plan.api;


import com.dubu.backend.global.domain.SuccessResponse;
import com.dubu.backend.plan.application.RouteService;
import com.dubu.backend.plan.dto.response.RouteSearchResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/routes")
public class RouteController {
    private final RouteService routeService;

    @GetMapping("/search")
    public SuccessResponse<List<RouteSearchResponseDto>> routeSearch(
            @RequestAttribute("memberId") Long memberId,
            @RequestParam("startX") Double startX,
            @RequestParam("startY") Double startY,
            @RequestParam("endX") Double endX,
            @RequestParam("endY") Double endY
    ) {
        List<RouteSearchResponseDto> response = routeService.getRoutesByStartAndDestination(memberId, startX, startY, endX, endY);

        return new SuccessResponse<>(response);
    }
}