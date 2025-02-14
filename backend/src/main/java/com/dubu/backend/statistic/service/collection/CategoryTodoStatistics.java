package com.dubu.backend.statistic.service.collection;

import com.dubu.backend.todo.entity.Category;
import com.dubu.backend.todo.entity.Todo;
import lombok.Getter;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Getter
public class CategoryTodoStatistics {
    private final Map<String, Integer> categoryTodoCount;

    public CategoryTodoStatistics(List<Category> categories) {
        this.categoryTodoCount = categories.stream().collect(Collectors.toMap(Category::getName, category -> 0));
    }

    public void countDoneTodoByCategory(Todo todo){
        categoryTodoCount.merge(todo.getCategory().getName(), 1, Integer::sum);
    }
}
