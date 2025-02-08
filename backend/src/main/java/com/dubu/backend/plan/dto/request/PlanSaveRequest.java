package com.dubu.backend.plan.dto.request;

import java.util.List;

public record PlanSaveRequest(
        Integer totalSectionTime,
        List<PlanSaveRequest.Path> paths
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