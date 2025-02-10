package com.dubu.backend.todo.converter;

import com.dubu.backend.todo.dto.enums.TodoRequestType;
import jakarta.validation.constraints.NotNull;
import org.springframework.core.convert.converter.Converter;

public class StringToTodoRequestTypeConverter implements Converter<String, TodoRequestType> {
    @Override
    public TodoRequestType convert(String type) {
        return TodoRequestType.fromString(type);
    }
}
