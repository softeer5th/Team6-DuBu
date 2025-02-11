package com.dubu.backend.plan.domain.enums;

import com.dubu.backend.plan.exception.InvalidMoodException;

import java.util.Arrays;

public enum Mood {
    DISSATISFIED,
    MODERATE,
    SATISFIED
    ;

    public static Mood fromString(String value) {
        return Arrays.stream(Mood.values())
                .filter(mood -> mood.name().equalsIgnoreCase(value))
                .findFirst()
                .orElseThrow(() -> new InvalidMoodException(value));
    }
}