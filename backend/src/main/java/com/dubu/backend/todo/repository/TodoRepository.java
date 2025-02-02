package com.dubu.backend.todo.repository;

import com.dubu.backend.todo.entity.Todo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TodoRepository extends JpaRepository<Todo, Long>{
    @Query("SELECT t FROM Todo t JOIN t.category c WHERE t.id = :todoId")
    Optional<Todo> findByIdWithCategory(@Param("todoId") Long todoId);
}
