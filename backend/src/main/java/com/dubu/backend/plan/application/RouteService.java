package com.dubu.backend.plan.application;

import com.dubu.backend.member.exception.MemberNotFoundException;
import com.dubu.backend.member.infra.repository.MemberRepository;
import com.dubu.backend.plan.domain.Path;
import com.dubu.backend.plan.domain.Plan;
import com.dubu.backend.plan.domain.vo.PathIdentifier;
import com.dubu.backend.plan.dto.response.OdsayRouteApiResponse;
import com.dubu.backend.plan.dto.response.RouteSearchResponse;
import com.dubu.backend.plan.infra.client.OdsayApiClient;
import com.dubu.backend.plan.infra.repository.PathRepository;
import com.dubu.backend.plan.infra.repository.PlanRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional(readOnly = true)
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
    public List<RouteSearchResponse> getRoutesByStartAndDestination(Long memberId, Double startX, Double startY, Double endX, Double endY) {
        memberRepository.findById(memberId)
                .orElseThrow(() -> new MemberNotFoundException(memberId));

        List<PathIdentifier> recentlyUsedRoute = loadRecentlyUsedRoute(memberId);

        OdsayRouteApiResponse odsayRouteApiResponse = odsayApiClient.searchPublicTransportRoute(startX, startY, endX, endY);

        List<RouteSearchResponse> response = new ArrayList<>();
        for (OdsayRouteApiResponse.Path apiPath : odsayRouteApiResponse.result().path()) {
            boolean isRecentlyUsed = isSameAsRecentlyUsedRoute(apiPath, recentlyUsedRoute);
            RouteSearchResponse routeDto = convertApiPathToRoute(apiPath, isRecentlyUsed);
            response.add(routeDto);
        }

        return response;
    }

    private List<PathIdentifier> loadRecentlyUsedRoute(Long memberId) {
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

                    return new PathIdentifier(
                            p.getTrafficType().name(),
                            startName,
                            endName
                    );
                })
                .toList();
    }

    private boolean isSameAsRecentlyUsedRoute(OdsayRouteApiResponse.Path apiPath,
                                              List<PathIdentifier> recentlyUsedRoute) {
        List<PathIdentifier> currentRouteKeys = extractRouteKeys(apiPath);

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

    private List<PathIdentifier> extractRouteKeys(OdsayRouteApiResponse.Path apiPath) {
        List<PathIdentifier> result = new ArrayList<>();
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
                result.add(new PathIdentifier(trafficType, startName, endName));
            }
        }
        return result;
    }


    private RouteSearchResponse convertApiPathToRoute(OdsayRouteApiResponse.Path apiPath, boolean isRecentlyUsed) {
        OdsayRouteApiResponse.Info info = apiPath.info();

        int totalTime = info.totalTime();
        int totalSectionTime = 0;

        List<RouteSearchResponse.Path> pathDtoList = new ArrayList<>();

        // SubPath(=ODsay) → Path(=두리번)Dto 변환
        for (OdsayRouteApiResponse.SubPath subPath : apiPath.subPath()) {
            RouteSearchResponse.Path dtoPath = convertApiSubPathToPathDto(subPath);

            if ("BUS".equals(dtoPath.trafficType()) || "SUBWAY".equals(dtoPath.trafficType())) {
                totalSectionTime += dtoPath.sectionTime();
            }
            pathDtoList.add(dtoPath);
        }

        return new RouteSearchResponse(isRecentlyUsed, totalTime, totalSectionTime, pathDtoList);
    }

    private RouteSearchResponse.Path convertApiSubPathToPathDto(OdsayRouteApiResponse.SubPath subPath) {
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

        return new RouteSearchResponse.Path(
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