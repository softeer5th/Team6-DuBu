package com.dubu.backend.todo.repository;

import com.dubu.backend.todo.entity.Schedule;
import com.dubu.backend.todo.entity.Todo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Optional;

public interface TodoRepository extends JpaRepository<Todo, Long>{
    @Query("SELECT t FROM Todo t JOIN t.category c WHERE t.id = :todoId")
    Optional<Todo> findByIdWithCategory(@Param("todoId") Long todoId);

    @Query("SELECT t FROM Todo t JOIN t.schedule s WHERE t.parentTodo = :todo AND s.date = :date")
    Optional<Todo> findByParentTodoAndScheduleDate(@Param("todo") Todo parentTodo, @Param("date")LocalDate date);

    @Query("SELECT t FROM Todo t WHERE t.parentTodo = :parentTodo AND t.schedule = :schedule")
    Optional<Todo> findByParentTodoAndSchedule(@Param("parentTodo") Todo parentTodo, @Param("schedule") Schedule schedule);
}
