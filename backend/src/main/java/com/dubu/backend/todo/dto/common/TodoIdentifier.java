package com.dubu.backend.todo.dto.common;

import lombok.Builder;

@Builder
public record TodoIdentifier(Long memberId, Long todoId, Long pathId) {
}
