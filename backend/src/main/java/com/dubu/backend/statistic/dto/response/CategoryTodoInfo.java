package com.dubu.backend.statistic.dto.response;

import java.util.List;
import java.util.Map;

public record CategoryTodoInfo(String category, int count) implements Comparable<CategoryTodoInfo>{
    @Override
    public int compareTo(CategoryTodoInfo other) {
        return Integer.compare(other.count, this.count);
    }

    public static List<CategoryTodoInfo> fromCategoryTodoCount(Map<String, Integer> categoryTodoCount){
        return categoryTodoCount.entrySet()
                .stream()
                .filter(entry -> entry.getValue() > 0)
                .map(entry -> new CategoryTodoInfo(entry.getKey(), entry.getValue()))
                .sorted()
                .toList();
    }
}