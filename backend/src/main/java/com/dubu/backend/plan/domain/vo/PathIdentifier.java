package com.dubu.backend.plan.domain.vo;

public record PathIdentifier(
        String trafficType,
        String startName,
        String endName
) {
}