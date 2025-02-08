package com.dubu.backend.todo.repository;

import com.dubu.backend.member.domain.Member;
import com.dubu.backend.todo.entity.Schedule;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.time.LocalDate;
import java.util.Optional;

import static com.dubu.backend.todo.entity.QSchedule.schedule;
import static com.dubu.backend.todo.entity.QTodo.*;

@RequiredArgsConstructor
public class CustomScheduleRepositoryImpl implements CustomScheduleRepository{
    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public Optional<Schedule> findLatestSchedule(Member member, LocalDate date){
        return Optional.ofNullable(jpaQueryFactory.selectFrom(schedule)
                .where(schedule.member.eq(member), schedule.date.loe(date))
                .orderBy(schedule.date.desc())
                .fetchFirst());
    }

    private JPAQuery<Schedule> applyJoinTodo(JPAQuery<Schedule> jpaQuery){
        return jpaQuery.leftJoin(schedule.todos, todo)
                .fetchJoin();
    }
}
