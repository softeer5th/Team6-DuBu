package com.dubu.backend.todo.support;

import com.dubu.backend.todo.entity.Todo;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;


@Component
public class TodoRandomSelector {

    public Todo selectOne(List<Todo> todos){
        return todos.get(ThreadLocalRandom.current().nextInt(todos.size()));
    }

    public List<Todo> selectTodos(int num, List<Todo> todos){
        Collections.shuffle(todos);
        return todos.subList(0, num);
    }
}
