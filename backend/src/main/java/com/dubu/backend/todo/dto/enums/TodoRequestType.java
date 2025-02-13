package com.dubu.backend.todo.dto.enums;

import com.dubu.backend.todo.exception.InvalidTodoRequestTypeException;
import jakarta.validation.ConstraintViolationException;
import lombok.Getter;

import java.util.Arrays;

@Getter
public enum TodoRequestType {
    TODAY("todayTodoManagementService", "todayTodoQueryService"),
    TOMORROW("tomorrowTodoManagementService", "tomorrowTodoQueryService"),
    SAVE("saveTodoManagementService", "saveTodoQueryService"),
    PATH("pathTodoManagementService", "pathTodoQueryService");

    private final String managementServiceName;
    private final String queryServiceName;

    TodoRequestType(String managementServiceName, String queryServiceName){
        this.managementServiceName = managementServiceName;
        this.queryServiceName = queryServiceName;
    }

    public static TodoRequestType fromString(String value){
        return Arrays.stream(values())
                .filter(type -> type.name().toLowerCase().equals(value))
                .findFirst()
                .orElseThrow(() -> new InvalidTodoRequestTypeException(value));
    }
}
