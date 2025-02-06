package com.dubu.backend.plan.dto.response;

import java.util.List;

public record RouteSearchResponseDto(
        Boolean isRecentlyUsed,
        Integer totalTime,
        Integer totalSectionTime,
        List<Path> paths
) {
    public record Path(
            String trafficType,
            Integer sectionTime,
            String subwayName,
            Integer subwayCode,
            String busNumber,
            Integer busId,
            String startName,
            String endName
    ) {
    }
}