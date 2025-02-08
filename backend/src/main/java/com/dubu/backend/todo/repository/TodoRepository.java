package com.dubu.backend.todo.repository;

import com.dubu.backend.member.domain.Member;
import com.dubu.backend.todo.entity.Schedule;
import com.dubu.backend.todo.entity.Todo;
import com.dubu.backend.todo.entity.TodoType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface TodoRepository extends JpaRepository<Todo, Long>, CustomTodoRepository{
    @Query("SELECT t FROM Todo t JOIN FETCH t.category c WHERE t.id = :todoId")
    Optional<Todo> findWithCategoryById(@Param("todoId") Long todoId);

    @Query("SELECT t FROM Todo t JOIN t.schedule s WHERE t.parentTodo = :todo AND s.date = :date")
    Optional<Todo> findWithScheduleByParentTodoAndScheduleDate(@Param("todo") Todo parentTodo, @Param("date")LocalDate date);

    @Query("SELECT t FROM Todo t WHERE t.parentTodo = :parentTodo AND t.schedule = :schedule")
    Optional<Todo> findByParentTodoAndSchedule(@Param("parentTodo") Todo parentTodo, @Param("schedule") Schedule schedule);

    @Query("SELECT t From Todo t WHERE t.member = :member AND t.parentTodo = :parentTodo AND t.type = :type")
    Optional<Todo> findByMemberAndParentTodoAndType(@Param("member") Member member, @Param("parentTodo") Todo parentTod, @Param("type") TodoType type);

    @Query("SELECT t FROM Todo t WHERE t.category.id in :categoryIds")
    List<Todo> findTodosByCategoryIds(@Param("categoryIds")List<Long> categoryIds);

    @Query("SELECT t FROM Todo t JOIN FETCH t.category WHERE t.schedule = :schedule")
    List<Todo> findTodosWithCategoryBySchedule(@Param("schedule")Schedule schedule);
}
