package com.dubu.backend.todo.entity;

public enum TodoDifficulty {
    EASY("쉬움"), NORMAL("보통"), HARD("어려움");

    private String name;

    TodoDifficulty(String name) {
        this.name = name;
    }
}
