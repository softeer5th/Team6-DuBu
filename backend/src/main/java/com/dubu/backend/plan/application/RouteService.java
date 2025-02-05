package com.dubu.backend.plan.application;

import com.dubu.backend.plan.dto.OdsayRouteApiResponse;
import com.dubu.backend.plan.dto.RouteSearchResponseDto;
import com.dubu.backend.plan.infra.client.OdsayApiClient;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RouteService {
    private final OdsayApiClient odsayApiClient;

    /**
     * 같은 의미인 명칭 정리
     * 두리번 사용 = ODsay 사용
     * Route = Path
     * Path = SubPath
     */
    public List<RouteSearchResponseDto> getRoutesByStartAndDestination(Double startX, Double startY, Double endX, Double endY) {
        OdsayRouteApiResponse odsayRouteApiResponse = odsayApiClient.searchPublicTransportRoute(startX, startY, endX, endY);

        List<RouteSearchResponseDto> response = new ArrayList<>();

        boolean isRecentlyUsed = false;

        for (OdsayRouteApiResponse.Path apiPath : odsayRouteApiResponse.result().path()) {
            RouteSearchResponseDto routeDto = convertApiPathToRoute(apiPath, isRecentlyUsed);
            response.add(routeDto);
        }
        return response;
    }

    private RouteSearchResponseDto convertApiPathToRoute(OdsayRouteApiResponse.Path apiPath, boolean isRecentlyUsed) {
        OdsayRouteApiResponse.Info info = apiPath.info();

        int totalTime = info.totalTime();
        int totalSectionTime = 0;

        List<RouteSearchResponseDto.Path> pathDtoList = new ArrayList<>();

        // SubPath(=ODsay) → Path(=두리번)Dto 변환
        for (OdsayRouteApiResponse.SubPath subPath : apiPath.subPath()) {
            RouteSearchResponseDto.Path dtoPath = convertApiSubPathToPathDto(subPath);

            if ("BUS".equals(dtoPath.trafficType()) || "SUBWAY".equals(dtoPath.trafficType())) {
                totalSectionTime += dtoPath.sectionTime();
            }
            pathDtoList.add(dtoPath);
        }

        return new RouteSearchResponseDto(isRecentlyUsed, totalTime, totalSectionTime, pathDtoList);
    }

    private RouteSearchResponseDto.Path convertApiSubPathToPathDto(OdsayRouteApiResponse.SubPath subPath) {
        int tType = subPath.trafficType();
        String trafficType = switch (tType) {
            case 1 -> "SUBWAY";
            case 2 -> "BUS";
            case 3 -> "WALK";
            default -> "UNKNOWN";
        };

        String subwayName = null;
        Integer subwayCode = null;
        String busNumber = null;
        Integer busCode = null;
        String startName = null;
        String endName = null;

        if (subPath.lane() != null && !subPath.lane().isEmpty()) {
            OdsayRouteApiResponse.Lane lane = subPath.lane().get(0);
            if ("SUBWAY".equals(trafficType)) {
                subwayName = lane.name();
                subwayCode = lane.subwayCode();
                startName = subPath.startName() + "역";
                endName = subPath.endName() + "역";
            } else if ("BUS".equals(trafficType)) {
                busNumber = lane.busNo();
                busCode = lane.busID();
                startName = subPath.startName();
                endName = subPath.endName();
            }
        }

        return new RouteSearchResponseDto.Path(
                trafficType,
                subPath.sectionTime(),
                subwayName,
                subwayCode,
                busNumber,
                busCode,
                startName,
                endName
        );
    }
}