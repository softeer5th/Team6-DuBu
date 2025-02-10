package com.dubu.backend.todo.dto.search;

import com.dubu.backend.member.domain.Member;
import com.dubu.backend.todo.entity.Category;
import com.dubu.backend.todo.entity.TodoDifficulty;
import com.dubu.backend.todo.entity.TodoType;
import lombok.Builder;

import java.util.List;

@Builder
public record TodoSearchCond(Member member, TodoType type, List<Category> categories, List<TodoDifficulty> difficulties) {
}
