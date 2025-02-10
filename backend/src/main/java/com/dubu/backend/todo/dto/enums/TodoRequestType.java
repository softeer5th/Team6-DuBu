package com.dubu.backend.todo.dto.enums;

import jakarta.validation.ConstraintViolationException;
import lombok.Getter;

import java.util.Arrays;

@Getter
public enum TodoRequestType {
    TODAY("todayTodoManagementService"),
    TOMORROW("tomorrowTodoManagementService"),
    SAVE("saveTodoManagementService"),
    PATH("pathTodoManagementService");

    private final String managementServiceName;

    TodoRequestType(String managementServiceName){
        this.managementServiceName = managementServiceName;
    }

    public static TodoRequestType fromString(String value){
        return Arrays.stream(values())
                .filter(type -> type.name().toLowerCase().equals(value))
                .findFirst()
                .orElseThrow(() -> new ConstraintViolationException("Invalid TodoRequestType value: " + value, null));
    }
}
