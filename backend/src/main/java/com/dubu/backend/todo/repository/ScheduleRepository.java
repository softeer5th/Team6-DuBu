package com.dubu.backend.todo.repository;

import com.dubu.backend.member.domain.Member;
import com.dubu.backend.todo.entity.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Optional;

public interface ScheduleRepository extends JpaRepository<Schedule, Long>, CustomScheduleRepository {
    @Query("SELECT s FROM Schedule s WHERE s.member = :member AND s.date = :date")
    Optional<Schedule> findScheduleByMemberAndDate(@Param("member") Member member, @Param("date") LocalDate date);

}
