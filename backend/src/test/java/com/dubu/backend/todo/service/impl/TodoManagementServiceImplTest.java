package com.dubu.backend.todo.service.impl;

import com.dubu.backend.member.domain.Member;
import com.dubu.backend.member.infrastructure.repository.MemberRepository;
import com.dubu.backend.todo.dto.request.CreateTodoRequest;
import com.dubu.backend.todo.dto.response.CreateTodoResponse;
import com.dubu.backend.todo.entity.Category;
import com.dubu.backend.todo.entity.Todo;
import com.dubu.backend.todo.entity.TodoDifficulty;
import com.dubu.backend.todo.entity.TodoType;
import com.dubu.backend.todo.repository.CategoryRepository;
import com.dubu.backend.todo.repository.TodoRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.then;
import static org.mockito.Mockito.times;

@ExtendWith(MockitoExtension.class)
class TodoManagementServiceImplTest {
    @InjectMocks
    private TodoManagementServiceImpl todoManagementService;

    @Mock
    private TodoRepository todoRepository;
    @Mock
    private CategoryRepository categoryRepository;

    @Mock
    private MemberRepository memberRepository;

    @Test
    @DisplayName("Todo 생성 테스트")
    void testCreateTodo(){
        // given
        Category category = Category.builder().name("독서").build();

        CreateTodoRequest createTodoRequest = new CreateTodoRequest("노인과 바다 읽기", "독서", "어려움", null);

        Member member = Member.builder()
                .id(1L)
                .build();

        Todo savedTodo = Todo.builder()
                .id(1L)
                .title("노인과 바다 읽기")
                .category(category)
                .todoDifficulty(TodoDifficulty.getByName("어려움"))
                .memo(null)
                .member(member)
                .scheduledDate(LocalDate.now().plusDays(1))
                .type(TodoType.SCHEDULED)
                .build();

        given(categoryRepository.findByName("독서")).willReturn(Optional.of(category));
        given(todoRepository.save(any(Todo.class))).willReturn(savedTodo);
        given(memberRepository.findById(any(Long.class))).willReturn(Optional.of(member));

        // when
        CreateTodoResponse createTodoResponse = todoManagementService.createTodo(1L, "tomorrow", createTodoRequest);// Member 아직 구현 X, null 로 처리

        // then
        assertThat(createTodoResponse.todoId()).isEqualTo(1L); //
        then(todoRepository).should(times(1)).save(any(Todo.class));
        then(categoryRepository).should(times(1)).findByName("독서");
        then(memberRepository).should(times(1)).findById(1L);
    }
}