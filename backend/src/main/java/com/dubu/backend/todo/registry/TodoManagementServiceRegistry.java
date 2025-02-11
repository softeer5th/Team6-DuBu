package com.dubu.backend.todo.registry;

import com.dubu.backend.todo.service.TodoManagementService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
@RequiredArgsConstructor
public class TodoManagementServiceRegistry {
    private final Map<String, TodoManagementService> todoManagementServices;

    public TodoManagementService getService(String serviceName){
        return todoManagementServices.get(serviceName);
    }
}
