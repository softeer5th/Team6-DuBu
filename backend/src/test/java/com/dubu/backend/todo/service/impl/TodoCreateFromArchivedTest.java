package com.dubu.backend.todo.service.impl;

import com.dubu.backend.member.domain.Member;
import com.dubu.backend.member.infra.repository.MemberRepository;
import com.dubu.backend.todo.dto.request.CreateTodoFromArchivedRequest;
import com.dubu.backend.todo.dto.response.TodoInfo;
import com.dubu.backend.todo.entity.*;
import com.dubu.backend.todo.repository.ScheduleRepository;
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
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.then;
import static org.mockito.Mockito.times;

@ExtendWith(MockitoExtension.class)
public class TodoCreateFromArchivedTest {
    @InjectMocks
    private TodoManagementServiceImpl todoManagementService;

    @Mock
    private TodoRepository todoRepository;

    @Mock
    private MemberRepository memberRepository;

    @Mock
    private ScheduleRepository scheduleRepository;

    private Member testMember;
    private Category testCategory;
    private Todo testTodo;
    private Todo testSavedTodo;
    private Schedule testSchedule;

    @BeforeEach
    void setUp(){
        testMember = Member.builder()
                .id(1L)
                .build();

        testCategory = Category.builder().name("독서").build();

        testTodo = Todo.builder()
                .id(1L)
                .title("노인과 바다 읽기")
                .category(testCategory)
                .difficulty(TodoDifficulty.HARD)
                .memo(null)
                .build();

        testSavedTodo = Todo.builder()
                .id(2L)
                .title("노인과 바다 읽기")
                .category(testCategory)
                .difficulty(TodoDifficulty.HARD)
                .memo(null)
                .build();

        testSchedule = Schedule.builder().date(LocalDate.now().plusDays(1)).build();
    }

    @Test
    @DisplayName("Todo 생성 성공 테스트")
    void testCreateTodoFromArchivedSuccess(){
        // given
        CreateTodoFromArchivedRequest createTodoRequest = new CreateTodoFromArchivedRequest(1L);

        given(memberRepository.findById(any(Long.class))).willReturn(Optional.of(testMember));
        given(todoRepository.findByIdWithCategory(any(Long.class))).willReturn(Optional.of(testTodo));
        given(scheduleRepository.findScheduleByMemberAndDate(testMember, LocalDate.now().plusDays(1))).willReturn(Optional.of(testSchedule));
        given(scheduleRepository.findFirstScheduleByMemberAndDateOrderByDateDesc(testMember, LocalDate.now().plusDays(1), true)).willReturn(Optional.of(testSchedule));
        given(todoRepository.save(any(Todo.class))).willReturn(testSavedTodo);

        // when
        TodoInfo todoInfo = todoManagementService.createTodoFromArchived(1L, "tomorrow", createTodoRequest);

        // then
        assertThat(todoInfo.todoId()).isEqualTo(2L);
        then(todoRepository).should(times(1)).save(any(Todo.class));
    }
}
