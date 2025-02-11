package com.dubu.backend.plan.infra.repository;

import com.dubu.backend.plan.domain.Path;
import com.dubu.backend.plan.domain.Plan;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.List;

import static com.dubu.backend.plan.domain.QPath.path;
import static com.dubu.backend.todo.entity.QTodo.todo;

@RequiredArgsConstructor
public class CustomPathRepositoryImpl implements CustomPathRepository {
    private final JPAQueryFactory queryFactory;

    @Override
    public List<Path> findByPlanWithTodosOrderByPathOrder(Plan plan) {
        return queryFactory
                .selectFrom(path)
                .leftJoin(path.todos, todo).fetchJoin()
                .where(path.plan.eq(plan))
                .orderBy(path.pathOrder.asc())
                .fetch();
    }
}