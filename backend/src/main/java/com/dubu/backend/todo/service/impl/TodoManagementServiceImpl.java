package com.dubu.backend.todo.service.impl;

import com.dubu.backend.member.domain.Member;
import com.dubu.backend.member.exception.NotFoundMemberException;
import com.dubu.backend.member.infrastructure.repository.MemberRepository;
import com.dubu.backend.todo.dto.request.CreateTodoRequest;
import com.dubu.backend.todo.dto.response.CreateTodoResponse;
import com.dubu.backend.todo.entity.Category;
import com.dubu.backend.todo.entity.Todo;
import com.dubu.backend.todo.exception.NotFoundCategoryException;
import com.dubu.backend.todo.repository.CategoryRepository;
import com.dubu.backend.todo.repository.TodoRepository;
import com.dubu.backend.todo.service.TodoManagementService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Transactional
public class TodoManagementServiceImpl implements TodoManagementService {
    private final TodoRepository todoRepository;
    private final CategoryRepository categoryRepository;
    private final MemberRepository memberRepository;

    @Override
    public CreateTodoResponse createTodo(Long memberId, String todoType, CreateTodoRequest createTodoRequest) {
        Category category = categoryRepository.findByName(createTodoRequest.category()).orElseThrow(NotFoundCategoryException::new);
        Member member = memberRepository.findById(memberId).orElseThrow(NotFoundMemberException::new);

        Todo todo = createTodoRequest.toEntity(member, todoType, category);

        Todo savedTodo = todoRepository.save(todo);

        return CreateTodoResponse.fromEntity(savedTodo);
    }

}
