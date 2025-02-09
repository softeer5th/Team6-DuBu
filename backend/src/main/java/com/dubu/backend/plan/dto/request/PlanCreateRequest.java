package com.dubu.backend.plan.dto.request;

import java.util.List;

public record PlanCreateRequest(
        Integer totalSectionTime,
        List<PlanCreateRequest.Path> paths
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