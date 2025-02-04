package com.dubu.backend.todo.service.resolver;

import java.time.LocalDate;

public class ScheduledDateResolver {
    public static LocalDate resolveScheduledDate(String todoType){
        if(todoType.equals("today"))
            return LocalDate.now();
        else if(todoType.equals("tomorrow"))
            return LocalDate.now().plusDays(1);
        return null;
    }
}
