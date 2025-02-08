package com.dubu.backend.todo.support;

import com.dubu.backend.todo.entity.Todo;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.concurrent.ThreadLocalRandom;


@Component
public class TodoRandomSelector {

    public Todo selectOne(List<Todo> todos){
        return todos.get(ThreadLocalRandom.current().nextInt(todos.size()));
    }
}
