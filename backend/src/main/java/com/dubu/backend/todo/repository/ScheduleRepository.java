package com.dubu.backend.todo.repository;

import com.dubu.backend.todo.entity.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ScheduleRepository extends JpaRepository<Schedule, Long>, CustomScheduleRepository {
}