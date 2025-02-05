package com.dubu.backend.todo.repository;

import com.dubu.backend.member.domain.Member;
import com.dubu.backend.todo.dto.response.TodoInfo;
import com.dubu.backend.todo.entity.QCategory;
import com.dubu.backend.todo.entity.QTodo;
import com.dubu.backend.todo.entity.Todo;
import com.dubu.backend.todo.entity.TodoType;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;

import java.util.List;
import java.util.stream.Collectors;

import static com.dubu.backend.todo.entity.QCategory.*;
import static com.dubu.backend.todo.entity.QTodo.*;

@RequiredArgsConstructor
public class CustomTodoRepositoryImpl implements CustomTodoRepository{
    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public Slice<TodoInfo> findTodosByMemberWithCursor(Long cursorId, Member member, TodoType type, Pageable pageable) {
        List<TodoInfo> results  = jpaQueryFactory.select(todo)
                .from(todo)
                .join(todo.category, category)
                .fetchJoin()
                .where(eqMember(member), eqType(type), eqCursorId(cursorId))
                .limit(pageable.getPageSize() + 1)
                .fetch().stream().map(TodoInfo::fromEntity).collect(Collectors.toList());

        boolean hasNext = false;

        if(results.size() > pageable.getPageSize()){
            results.remove(pageable.getPageSize());
            hasNext = true;
        }

        return new SliceImpl<>(results, pageable, hasNext);
    }

    private BooleanExpression eqMember(Member member){
        if(member != null)
            return todo.member.eq(member);
        return null;
    }

    private BooleanExpression eqType(TodoType type){
        if(type != null)
            return todo.type.eq(type);
        return null;
    }

    private BooleanExpression eqCursorId(Long cursorId){
        if(cursorId != null)
            return todo.id.gt(cursorId);
        return null;
    }
}
