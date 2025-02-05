package com.dubu.backend.plan.domain.vo;

public record RouteIdentifier(
        String trafficType,
        String startName,
        String endName
) {
}