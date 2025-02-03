package com.dubu.backend.todo.repository;

import com.dubu.backend.member.domain.Member;
import com.dubu.backend.todo.entity.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Optional;

@Repository
public interface ScheduleRepository extends JpaRepository<Schedule, Long>, CustomScheduleRepository {
    // 나중 고민, Order By 를 적용한 것이 빠를 지 아닐지
    @Query("SELECT s FROM Schedule s WHERE s.member = :member AND s.date = :date")
    Optional<Schedule> findScheduleByMemberAndDate(@Param("member") Member member, @Param("date") LocalDate date);
}
