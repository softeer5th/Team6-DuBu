package com.dubu.backend.todo.registry;

import com.dubu.backend.todo.service.TodoQueryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
@RequiredArgsConstructor
public class TodoQueryServiceRegistry {
    private final Map<String, TodoQueryService> todoQueryServices;

    public TodoQueryService getService(String serviceName){
        return todoQueryServices.get(serviceName);
    }
}
