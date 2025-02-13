package com.dubu.backend.todo.service.impl;

import com.dubu.backend.global.domain.PageResponse;
import com.dubu.backend.member.domain.Member;
import com.dubu.backend.member.domain.enums.Status;
import com.dubu.backend.member.exception.MemberNotFoundException;
import com.dubu.backend.member.infra.repository.MemberCategoryRepository;
import com.dubu.backend.member.infra.repository.MemberRepository;
import com.dubu.backend.plan.exception.InvalidMemberStatusException;
import com.dubu.backend.todo.dto.common.Cursor;
import com.dubu.backend.todo.dto.common.TodoIdentifier;
import com.dubu.backend.todo.dto.request.RecommendTodoQueryRequest;
import com.dubu.backend.todo.dto.request.SaveTodoQueryRequest;
import com.dubu.backend.todo.dto.response.TodoInfo;
import com.dubu.backend.todo.dto.search.TodoSearchCond;
import com.dubu.backend.todo.entity.*;
import com.dubu.backend.todo.repository.CategoryRepository;
import com.dubu.backend.todo.repository.TodoRepository;
import com.dubu.backend.todo.service.TodoQueryService;
import com.dubu.backend.todo.support.TodoRandomSelector;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class SaveTodoQueryService implements TodoQueryService {
    private final MemberRepository memberRepository;
    private final MemberCategoryRepository memberCategoryRepository;
    private final CategoryRepository categoryRepository;
    private final TodoRepository todoRepository;

    private final TodoRandomSelector todoRandomSelector;

    @Override
    public PageResponse<Long, List<TodoInfo>> findSaveTodos(TodoIdentifier identifier, Long cursor, SaveTodoQueryRequest request) {
        Member member = memberRepository.findById(identifier.memberId()).orElseThrow(() -> new MemberNotFoundException(identifier.memberId()));

        // 회원의 상태는 정지여야 한다.
        if(!member.getStatus().equals(Status.STOP)){
            throw new InvalidMemberStatusException(member.getStatus().name());
        }
        Slice<Todo> todoSlice = todoRepository.findTodosUsingSingleCursor(cursor,
                TodoSearchCond.builder()
                        .member(member)
                        .type(TodoType.SAVE)
                        .build(),
                PageRequest.ofSize(request.size()));

        List<Todo> saveTodos = todoSlice.getContent();
        List<TodoInfo> todoInfos = TodoInfo.fromEntities(saveTodos);

        if(todoInfos.isEmpty()){
            return new PageResponse<>(todoSlice.hasNext(), null, todoInfos);
        }

        return new PageResponse<>(todoSlice.hasNext(), todoInfos.get(todoInfos.size() - 1).todoId(), todoInfos);
    }

    @Override
    public List<TodoInfo> findPersonalizedRecommendTodos(TodoIdentifier identifier) {
        Member member = memberRepository.findById(identifier.memberId()).orElseThrow(() -> new MemberNotFoundException(identifier.memberId()));

        // 회원의 상태는 정지여야 한다.
        if(!member.getStatus().equals(Status.STOP)){
            throw new InvalidMemberStatusException(member.getStatus().name());
        }
        // 회원의 카테고리 정보에 해당하는 추천 할 일을 가져온다.
        List<Long> categoryIds = memberCategoryRepository.findCategoryIdsByMember(member);
        List<Todo> recommendTodos = todoRepository.findTodosWithCategoryByCategoryIdsAndType(categoryIds, TodoType.RECOMMEND);

        List<Todo> personalizedTodos = todoRandomSelector.selectTodos(5, recommendTodos);

        // 즐겨찾기 할 일 의 부모 할 일로 추천 할 일이 있는지를 확인하고 있으면 hasChild = true, 없으면 hasChild = false 설정
        List<Long> parentIdsOfSaveTodos = todoRepository.findParentTodoIdsByParentTodoAndMemberAndType(personalizedTodos, member, TodoType.SAVE);
        HashSet<Long> parentIdOfSaveTodoSet = new HashSet<>(parentIdsOfSaveTodos);

        return personalizedTodos.stream()
                .map(t -> {
                    if (parentIdOfSaveTodoSet.contains(t.getId())) {
                        return TodoInfo.fromEntity(true, t);
                    }
                    return TodoInfo.fromEntity(false, t);
                }).toList();
    }

    @Override
    public PageResponse<Cursor, List<TodoInfo>> findAllRecommendTodos(TodoIdentifier identifier, Cursor cursor, RecommendTodoQueryRequest request) {
        Member member = memberRepository.findById(identifier.memberId()).orElseThrow(() -> new MemberNotFoundException(identifier.memberId()));

        // 회원의 상태는 정지여야 한다.
        if(!member.getStatus().equals(Status.STOP)){
            throw new InvalidMemberStatusException(member.getStatus().name());
        }

        List<Category> categories = null;
        if(request.category() != null && !request.category().isEmpty()){
            categories = categoryRepository.findCategoriesByName(request.category());
        }

        List<TodoDifficulty> difficulties = null;
        if(request.difficulty() != null && !request.difficulty().isEmpty()){
            difficulties = request.difficulty().stream().map(TodoDifficulty::valueOf).toList();
        }

        Slice<Todo> todoSlice = todoRepository.findTodosUsingCompositeCursor(cursor,
                TodoSearchCond.builder()
                        .type(TodoType.RECOMMEND)
                        .categories(categories)
                        .difficulties(difficulties)
                        .build(),
                PageRequest.ofSize(request.size()));

        List<Todo> recommendTodos = todoSlice.getContent();

        // 즐겨찾기 할 일 의 부모 할 일로 추천 할 일이 있는지를 확인하고 있으면 hasChild = true, 없으면 hasChild = false 설정
        List<Long> parentIdsOfSaveTodos = todoRepository.findParentTodoIdsByParentTodoAndMemberAndType(recommendTodos, member, TodoType.SAVE);
        HashSet<Long> parentIdOfSaveTodoSet = new HashSet<>(parentIdsOfSaveTodos);

        List<TodoInfo> todoInfos = recommendTodos.stream()
                .map(t -> {
                    if (parentIdOfSaveTodoSet.contains(t.getId())) {
                        return TodoInfo.fromEntity(true, t);
                    }
                    return TodoInfo.fromEntity(false, t);
                }).toList();

        if(todoInfos.isEmpty()){
            return new PageResponse<>(todoSlice.hasNext(), null, todoInfos);
        }
        Todo lastTodo = recommendTodos.get(recommendTodos.size() - 1);
        return new PageResponse<>(todoSlice.hasNext(), Cursor.of(lastTodo.getCategory().getId(), lastTodo.getDifficulty(), lastTodo.getId()), todoInfos);
    }
}
