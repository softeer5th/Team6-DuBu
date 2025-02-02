package com.dubu.backend.todo.service.impl;

import com.dubu.backend.member.domain.Member;
import com.dubu.backend.member.exception.NotFoundMemberException;
import com.dubu.backend.member.infrastructure.repository.MemberRepository;
import com.dubu.backend.todo.dto.request.CreateTodoRequest;
import com.dubu.backend.todo.dto.response.CreateTodoResponse;
import com.dubu.backend.todo.entity.Category;
import com.dubu.backend.todo.entity.Todo;
import com.dubu.backend.todo.entity.TodoDifficulty;
import com.dubu.backend.todo.entity.TodoType;
import com.dubu.backend.todo.exception.NotFoundCategoryException;
import com.dubu.backend.todo.repository.CategoryRepository;
import com.dubu.backend.todo.repository.TodoRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.then;
import static org.mockito.Mockito.times;

@ExtendWith(MockitoExtension.class)
class TodoCreateTest {
    @InjectMocks
    private TodoManagementServiceImpl todoManagementService;

    @Mock
    private TodoRepository todoRepository;
    @Mock
    private CategoryRepository categoryRepository;

    @Mock
    private MemberRepository memberRepository;

    private Category testCategory;
    private Member testMember;
    private Todo testTodo;

    @BeforeEach
    void setUp(){
        testCategory = Category.builder().name("독서").build();

        testMember = Member.builder()
                .id(1L)
                .build();

        testTodo = Todo.builder()
                .id(1L)
                .title("노인과 바다 읽기")
                .category(testCategory)
                .todoDifficulty(TodoDifficulty.getByName("어려움"))
                .memo(null)
                .member(testMember)
                .scheduledDate(LocalDate.now().plusDays(1))
                .type(TodoType.SCHEDULED)
                .build();
    }

    @Test
    @DisplayName("Todo 생성 성공 테스트")
    void testCreateTodoSuccess(){
        // given
        CreateTodoRequest createTodoRequest = new CreateTodoRequest("노인과 바다 읽기", "독서", "어려움", null);

        given(categoryRepository.findByName("독서")).willReturn(Optional.of(testCategory));
        given(todoRepository.save(any(Todo.class))).willReturn(testTodo);
        given(memberRepository.findById(any(Long.class))).willReturn(Optional.of(testMember));

        // when
        CreateTodoResponse createTodoResponse = todoManagementService.createTodo(1L, "tomorrow", createTodoRequest);

        // then
        assertThat(createTodoResponse.todoId()).isEqualTo(1L); //
        then(todoRepository).should(times(1)).save(any(Todo.class));
        then(categoryRepository).should(times(1)).findByName("독서");
        then(memberRepository).should(times(1)).findById(1L);
    }

    @Test
    @DisplayName("Todo 생성 실패 테스트 - 사용자 없음")
    void testCreateTodoFailNotFoundMember(){
        // given
        CreateTodoRequest createTodoRequest = new CreateTodoRequest("노인과 바다 읽기", "독서", "어려움", null);

        given(categoryRepository.findByName("독서")).willReturn(Optional.of(testCategory));
        given(memberRepository.findById(any(Long.class))).willReturn(Optional.empty());

        // when & then
        assertThatThrownBy(() -> todoManagementService.createTodo(1L, "tomorrow", createTodoRequest)).isInstanceOf(NotFoundMemberException.class);
    }

    @Test
    @DisplayName("Todo 생성 실패 테스트 - 카테고리 없음")
    void testCreateTodoFailNotFoundCategory(){
        // given
        CreateTodoRequest createTodoRequest = new CreateTodoRequest("노인과 바다 읽기", "독서", "어려움", null);

        given(categoryRepository.findByName("독서")).willReturn(Optional.empty());

        // when & then
        assertThatThrownBy(() -> todoManagementService.createTodo(1L, "tomorrow", createTodoRequest)).isInstanceOf(NotFoundCategoryException.class);

    }
}