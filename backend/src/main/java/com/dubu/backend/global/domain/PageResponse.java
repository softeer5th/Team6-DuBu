package com.dubu.backend.global.domain;

public record PageResponse<T>(boolean hasNext, Long nextCursor, T data) {
}
