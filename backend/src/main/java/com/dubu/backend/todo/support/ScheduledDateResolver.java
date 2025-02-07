package com.dubu.backend.todo.support;

import java.time.LocalDate;

public class ScheduledDateResolver {
    public static LocalDate resolveScheduledDate(String todoType){
        // 오늘
        if(todoType.equals("today"))
            return LocalDate.now();

        // 내일
        return LocalDate.now().plusDays(1);
    }
}
