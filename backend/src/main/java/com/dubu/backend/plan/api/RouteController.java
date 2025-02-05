package com.dubu.backend.plan.api;


import com.dubu.backend.global.domain.SuccessResponse;
import com.dubu.backend.plan.application.RouteService;
import com.dubu.backend.plan.dto.RouteSearchResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/paths")
public class RouteController {
    private final RouteService routeService;

    @GetMapping("/search")
    public SuccessResponse<List<RouteSearchResponseDto>> routeSearch(
            @RequestParam(name = "startX") Double startX,
            @RequestParam(name = "startY") Double startY,
            @RequestParam(name = "endX") Double endX,
            @RequestParam(name = "endY") Double endY
    ) {
        List<RouteSearchResponseDto> response = routeService.getRoutesByStartAndDestination(startX, startY, endX, endY);

        return new SuccessResponse<>(response);
    }
}