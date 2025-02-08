package com.dubu.backend.plan.domain.enums;

import com.dubu.backend.plan.exception.InvalidTrafficTypeException;

import java.util.Arrays;

public enum TrafficType {
    SUBWAY, BUS;

    public static TrafficType from(String value) {
        return Arrays.stream(TrafficType.values())
                .filter(type -> type.name().equalsIgnoreCase(value))
                .findFirst()
                .orElseThrow(() -> new InvalidTrafficTypeException(value));
    }
}