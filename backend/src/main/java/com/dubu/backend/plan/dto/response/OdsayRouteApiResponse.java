package com.dubu.backend.plan.dto.response;

import java.util.List;

public record OdsayRouteApiResponse(
        Result result
) {
    public record Result(
            int searchType,
            int outTrafficCheck,
            int busCount,
            int subwayCount,
            int subwayBusCount,
            double pointDistance,
            int startRadius,
            int endRadius,
            List<Path> path
    ) {}

    public record Path(
            int pathType,
            Info info,
            List<SubPath> subPath
    ) {}

    public record Info(
            double trafficDistance,
            int totalWalk,
            int totalTime,
            int payment,
            int busTransitCount,
            int subwayTransitCount,
            String mapObj,
            String firstStartStation,
            String firstStartStationKor,
            String firstStartStationJpnKata,
            String lastEndStation,
            String lastEndStationKor,
            String lastEndStationJpnKata,
            int totalStationCount,
            int busStationCount,
            int subwayStationCount,
            double totalDistance,
            int totalWalkTime,
            int checkIntervalTime,
            String checkIntervalTimeOverYn,
            int totalIntervalTime
    ) {}

    public record SubPath(
            int trafficType,
            double distance,
            int sectionTime,
            Integer stationCount,
            List<Lane> lane,
            Integer intervalTime,
            String startName,
            String startNameKor,
            String startNameJpnKata,
            double startX,
            double startY,
            String endName,
            String endNameKor,
            String endNameJpnKata,
            double endX,
            double endY,
            String way,
            Integer wayCode,
            String door,
            Integer startID,
            Integer endID,
            Integer startStationCityCode,
            Integer startStationProviderCode,
            String startLocalStationID,
            String startArsID,
            Integer endStationCityCode,
            Integer endStationProviderCode,
            String endLocalStationID,
            String endArsID,
            String startExitNo,
            Double startExitX,
            Double startExitY,
            String endExitNo,
            Double endExitX,
            Double endExitY,
            PassStopList passStopList
    ) {}

    public record Lane(
            String name,
            String nameKor,
            String nameJpnKata,
            Integer subwayCode,
            Integer subwayCityCode,
            String busNo,
            String busNoKor,
            String busNoJpnKata,
            Integer type,
            Integer busID,
            String busLocalBlID,
            Integer busCityCode,
            Integer busProviderCode
    ) {}

    public record PassStopList(List<Station> stations) {}

    public record Station(
            int index,
            int stationID,
            String stationName,
            String stationNameKor,
            String stationNameJpnKata,
            Integer stationCityCode,
            Integer stationProviderCode,
            String localStationID,
            String arsID,
            String x,
            String y,
            String isNonStop
    ) {}
}