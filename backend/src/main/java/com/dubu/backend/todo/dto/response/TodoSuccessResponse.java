package com.dubu.backend.todo.dto.response;

public record TodoSuccessResponse<D>(boolean isTomorrowScheduleCreated, D data) {
}
