package com.dubu.backend.todo.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;

public record TodoSuccessResponse<D>(@JsonInclude(JsonInclude.Include.NON_NULL) Boolean isTomorrowScheduleCreated, D data) {
}
