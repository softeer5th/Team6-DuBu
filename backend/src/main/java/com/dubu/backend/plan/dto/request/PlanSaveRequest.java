package com.dubu.backend.plan.dto.request;

import com.dubu.backend.plan.dto.response.RouteSearchResponseDto;

import java.util.List;

public record PlanSaveRequest(
        Integer totalSectionTime,
        List<RouteSearchResponseDto.Path> paths
) {
    public record Path(
            String trafficType,
            Integer sectionTime,
            Integer subwayCode,
            String busNumber,
            String startName,
            String endName
    ) {
    }
}