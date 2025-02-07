package com.dubu.backend.todo.entity;

public enum TodoType {
    SCHEDULED, SAVE, RECOMMEND, IN_PROGRESS, DONE;

    public static TodoType get(String type){
        return switch(type){
            case "TODAY", "tomorrow" -> TodoType.SCHEDULED;
            case "SAVE" -> TodoType.SAVE;
            case "RECOMMEND" -> TodoType.RECOMMEND;
            case "IN_PROGRESS" -> TodoType.IN_PROGRESS;
            default -> TodoType.DONE;
        };
    }
}