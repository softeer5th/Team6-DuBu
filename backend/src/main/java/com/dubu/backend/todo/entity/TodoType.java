package com.dubu.backend.todo.entity;

public enum TodoType {
    SAVE, RECOMMEND, DONE, SCHEDULED;

    public static TodoType get(String type){
        if(type.equals("today") || type.equals("tomorrow"))
            return TodoType.SCHEDULED;
        else if(type.equals("save"))
            return TodoType.SAVE;
        else if(type.equals("recommend"))
            return TodoType.RECOMMEND;
        else
            return TodoType.DONE;
    }
}