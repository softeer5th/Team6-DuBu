package com.dubu.backend.member.domain.enums;

import com.dubu.backend.member.exception.InvalidStatusException;

import java.util.Arrays;

public enum Status {
    ONBOARDING, STOP, MOVE, FEEDBACK;

    public static Status fromString(String value) {
        return Arrays.stream(Status.values())
                .filter(status -> status.name().equalsIgnoreCase(value))
                .findFirst()
                .orElseThrow(() -> new InvalidStatusException(value));
    }
}