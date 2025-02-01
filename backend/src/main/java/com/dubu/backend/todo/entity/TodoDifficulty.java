package com.dubu.backend.todo.entity;

import java.util.HashMap;
import java.util.Map;

public enum TodoDifficulty {
    EASY("쉬움"), NORMAL("보통"), HARD("어려움");

    private final String koreanName;

    TodoDifficulty(String koreanName) {
        this.koreanName = koreanName;
    }

    public String getName(){
        return this.koreanName;
    }

    private static final Map<String, TodoDifficulty> todoDifficultyMap = new HashMap<>();

    static {
        for (TodoDifficulty todoDifficulty : TodoDifficulty.values()) {
            todoDifficultyMap.put(todoDifficulty.getName(), todoDifficulty);
        }
    }

    public static TodoDifficulty getByName(String name){
        return todoDifficultyMap.get(name);
    }
}
