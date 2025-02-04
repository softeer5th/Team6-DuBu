package com.dubu.backend.todo.exception;

import com.dubu.backend.global.exception.NotFoundException;

import static com.dubu.backend.global.exception.ErrorCode.*;

public class ScheduleNotFoundException extends NotFoundException {

    public ScheduleNotFoundException() {
        super(SCHEDULE_NOT_FOUND.getMessage());
    }

    @Override
    public String getErrorCode() {
        return SCHEDULE_NOT_FOUND.name();
    }
}
