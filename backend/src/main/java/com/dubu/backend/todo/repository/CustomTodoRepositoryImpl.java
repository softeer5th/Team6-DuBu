package com.dubu.backend.todo.repository;

import com.dubu.backend.member.domain.Member;
import com.dubu.backend.todo.dto.common.Cursor;
import com.dubu.backend.todo.dto.search.TodoSearchCond;
import com.dubu.backend.todo.entity.Category;
import com.dubu.backend.todo.entity.Todo;
import com.dubu.backend.todo.entity.TodoDifficulty;
import com.dubu.backend.todo.entity.TodoType;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;

import java.util.List;

import static com.dubu.backend.todo.entity.QCategory.*;
import static com.dubu.backend.todo.entity.QTodo.*;

@RequiredArgsConstructor
public class CustomTodoRepositoryImpl implements CustomTodoRepository{
    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public Slice<Todo> findTodosUsingSingleCursor(Long cursor, TodoSearchCond cond, Pageable pageable) {
        List<Todo> results = jpaQueryFactory.select(todo)
                .from(todo)
                .join(todo.category, category)
                .fetchJoin()
                .where(gtCursorId(cursor), eqMember(cond.member()), eqType(cond.type()))
                .limit(pageable.getPageSize() + 1)
                .fetch();
        boolean hasNext = false;

        if(results.size() > pageable.getPageSize()){
            results.remove(pageable.getPageSize());
            hasNext = true;
        }

        return new SliceImpl<>(results, pageable, hasNext);
    }

    @Override
    public Slice<Todo> findTodosUsingCompositeCursor(Cursor cursor, TodoSearchCond cond, Pageable pageable) {
        List<Todo> results  = jpaQueryFactory.select(todo)
                .from(todo)
                .join(todo.category, category)
                .fetchJoin()
                .where(cursor(cursor), eqMember(cond.member()), eqType(cond.type()), inCategories(cond.categories()), inDifficulties(cond.difficulties()))
                .orderBy(todo.category.id.asc(), todo.difficulty.asc(), todo.id.asc())
                .limit(pageable.getPageSize() + 1)
                .fetch();

        boolean hasNext = false;

        if(results.size() > pageable.getPageSize()){
            results.remove(pageable.getPageSize());
            hasNext = true;
        }

        return new SliceImpl<>(results, pageable, hasNext);
    }
    private BooleanExpression cursor(Cursor cursor){
        Long categoryId = cursor.cursorCategoryId();
        String difficulty = cursor.cursorDifficulty();
        Long todoId = cursor.cursorTodoId();

        if(categoryId == null || difficulty == null || todoId == null){
            return null;
        }

        BooleanExpression cond1 = todo.category.id.gt(categoryId);
        BooleanExpression cond2 = todo.category.id.eq(categoryId).and(todo.difficulty.gt(TodoDifficulty.valueOf(difficulty)));
        BooleanExpression cond3 = todo.category.id.eq(categoryId).and(todo.difficulty.eq((TodoDifficulty.valueOf(difficulty))).and(todo.id.gt(todoId)));

        return cond1.or(cond2).or(cond3);
    }

    private BooleanExpression gtCursorId(Long cursorId){
        if(cursorId != null)
            return todo.id.gt(cursorId);
        return null;
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

    private BooleanExpression inCategories(List<Category> categories){
        if(categories != null)
            return todo.category.in(categories);
        return null;
    }

    private BooleanExpression inDifficulties(List<TodoDifficulty> difficulties){
        if(difficulties != null)
            return todo.difficulty.in(difficulties);
        return null;
    }
}
