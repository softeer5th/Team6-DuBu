package com.dubu.backend.global.domain;

public record SuccessResponse<D>(
        D data
) {
}