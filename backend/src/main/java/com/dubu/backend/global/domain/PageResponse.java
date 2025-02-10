package com.dubu.backend.global.domain;

public record PageResponse<C, T>(boolean hasNext, C nextCursor, T data) {
}
