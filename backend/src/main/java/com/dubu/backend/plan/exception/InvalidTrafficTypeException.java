package com.dubu.backend.plan.exception;

import com.dubu.backend.global.exception.BadRequestException;

import static com.dubu.backend.global.exception.ErrorCode.INVALID_TRAFFIC_TYPE;

public class InvalidTrafficTypeException extends BadRequestException {
    public InvalidTrafficTypeException(String trafficType) {
        super(INVALID_TRAFFIC_TYPE.getMessage().formatted(trafficType));
    }

    @Override
    public String getErrorCode() {
        return INVALID_TRAFFIC_TYPE.name();
    }
}