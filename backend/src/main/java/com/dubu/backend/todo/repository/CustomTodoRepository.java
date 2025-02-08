package com.dubu.backend.todo.repository;

import com.dubu.backend.member.domain.Member;
import com.dubu.backend.todo.dto.response.TodoInfo;
import com.dubu.backend.todo.entity.Todo;
import com.dubu.backend.todo.entity.TodoType;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

public interface CustomTodoRepository {
    Slice<TodoInfo> findTodosByMemberWithCursor(Long cursorId, Member member, TodoType todoType, Pageable pageable);
}
