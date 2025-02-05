package com.dubu.backend.plan.application;

import com.dubu.backend.member.exception.MemberNotFoundException;
import com.dubu.backend.member.infra.repository.MemberRepository;
import com.dubu.backend.plan.domain.Path;
import com.dubu.backend.plan.domain.Plan;
import com.dubu.backend.plan.domain.vo.RouteIdentifier;
import com.dubu.backend.plan.dto.OdsayRouteApiResponse;
import com.dubu.backend.plan.dto.RouteSearchResponseDto;
import com.dubu.backend.plan.infra.client.OdsayApiClient;
import com.dubu.backend.plan.infra.repository.PathRepository;
import com.dubu.backend.plan.infra.repository.PlanRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RouteService {
    private final OdsayApiClient odsayApiClient;
    private final MemberRepository memberRepository;
    private final PlanRepository planRepository;
    private final PathRepository pathRepository;

    /**
     * 같은 의미인 명칭 정리
     * 두리번 사용 = ODsay 사용
     * Route = Path
     * Path = SubPath
     */
    public List<RouteSearchResponseDto> getRoutesByStartAndDestination(Long memberId, Double startX, Double startY, Double endX, Double endY) {
        memberRepository.findById(memberId)
                .orElseThrow(() -> new MemberNotFoundException(memberId));

        List<RouteIdentifier> recentlyUsedRoute = loadRecentlyUsedRoute(memberId);

        OdsayRouteApiResponse odsayRouteApiResponse = odsayApiClient.searchPublicTransportRoute(startX, startY, endX, endY);

        List<RouteSearchResponseDto> response = new ArrayList<>();
        for (OdsayRouteApiResponse.Path apiPath : odsayRouteApiResponse.result().path()) {
            boolean isRecentlyUsed = isSameAsRecentlyUsedRoute(apiPath, recentlyUsedRoute);
            RouteSearchResponseDto routeDto = convertApiPathToRoute(apiPath, isRecentlyUsed);
            response.add(routeDto);
        }

        return response;
    }

    private List<RouteIdentifier> loadRecentlyUsedRoute(Long memberId) {
        Plan latestPlan = planRepository.findTopByMemberIdOrderByCreatedAtDesc(memberId)
                .orElse(null);

        if (latestPlan == null) {
            return List.of();
        }

        List<Path> pathList = pathRepository.findByPlanIdOrderByPathOrderAsc(latestPlan.getId());

        return pathList.stream()
                .map(p -> {
                    String startName = p.getStartName();
                    String endName = p.getEndName();

                    return new RouteIdentifier(
                            p.getTrafficType().name(),
                            startName,
                            endName
                    );
                })
                .toList();
    }

    private boolean isSameAsRecentlyUsedRoute(OdsayRouteApiResponse.Path apiPath,
                                              List<RouteIdentifier> recentlyUsedRoute) {
        List<RouteIdentifier> currentRouteKeys = extractRouteKeys(apiPath);

        if (currentRouteKeys.size() != recentlyUsedRoute.size()) {
            return false;
        }
        for (int i = 0; i < currentRouteKeys.size(); i++) {
            if (!currentRouteKeys.get(i).equals(recentlyUsedRoute.get(i))) {
                return false;
            }
        }
        return true;
    }

    private List<RouteIdentifier> extractRouteKeys(OdsayRouteApiResponse.Path apiPath) {
        List<RouteIdentifier> result = new ArrayList<>();
        for (OdsayRouteApiResponse.SubPath subPath : apiPath.subPath()) {
            int tType = subPath.trafficType();
            if (tType == 1 || tType == 2) {
                String trafficType = (tType == 1) ? "SUBWAY" : "BUS";

                String startName = subPath.startName();
                String endName = subPath.endName();
                if (tType == 1) { // 지하철
                    startName += "역";
                    endName += "역";
                }
                result.add(new RouteIdentifier(trafficType, startName, endName));
            }
        }
        return result;
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