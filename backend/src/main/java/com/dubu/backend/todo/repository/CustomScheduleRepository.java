package com.dubu.backend.todo.repository;

import com.dubu.backend.member.domain.Member;
import com.dubu.backend.todo.entity.Schedule;

import java.time.LocalDate;
import java.util.Optional;

public interface CustomScheduleRepository {
    Optional<Schedule> findLatestSchedule(Member member, LocalDate date);
}
