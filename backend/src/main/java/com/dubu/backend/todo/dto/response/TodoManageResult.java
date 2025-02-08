package com.dubu.backend.todo.dto.response;

public record TodoManageResult<D>(boolean isTomorrowScheduleCreated, D info) {

    public static<D> TodoManageResult<D> of(boolean isTomorrowScheduleCreated, D info){
        return new TodoManageResult<D>(isTomorrowScheduleCreated, info);
    }
}
