package com.dubu.backend.todo.repository;

import com.dubu.backend.member.domain.Member;
import com.dubu.backend.todo.entity.QSchedule;
import com.dubu.backend.todo.entity.Schedule;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.time.LocalDate;
import java.util.Optional;

import static com.dubu.backend.todo.entity.QSchedule.schedule;

@RequiredArgsConstructor
public class CustomScheduleRepositoryImpl implements CustomScheduleRepository{
    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public Optional<Schedule> findFirstScheduleByMemberAndDateOrderByDateDesc(Member member, LocalDate date){
        return Optional.ofNullable(jpaQueryFactory.selectFrom(schedule)
                .where(schedule.member.eq(member), schedule.date.loe(date))
                .orderBy(schedule.date.desc())
                .fetchFirst());
    }
}
