package com.dubu.backend.todo.dto.response;

public record TodoManageResult<D>(Boolean isTomorrowScheduleCreated, D info) {

    public static<D> TodoManageResult<D> of(Boolean isTomorrowScheduleCreated, D info){
        return new TodoManageResult<D>(isTomorrowScheduleCreated, info);
    }
}
