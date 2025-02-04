package com.dubu.backend.todo.entity;

public enum TodoType {
    SAVE, RECOMMEND, DONE, SCHEDULED;

    public static TodoType get(String type){
        return switch(type){
            case "TODAY", "tomorrow" -> TodoType.SCHEDULED;
            case "SAVE" -> TodoType.SAVE;
            case "RECOMMEND" -> TodoType.RECOMMEND;
            default -> TodoType.DONE;
        };
    }
}