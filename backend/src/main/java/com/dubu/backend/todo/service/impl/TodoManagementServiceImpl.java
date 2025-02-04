package com.dubu.backend.todo.service.impl;

import com.dubu.backend.member.domain.Member;
import com.dubu.backend.member.exception.NotFoundMemberException;
import com.dubu.backend.member.infra.repository.MemberRepository;
import com.dubu.backend.todo.dto.request.CreateTodoFromArchivedRequest;
import com.dubu.backend.todo.dto.request.CreateTodoRequest;
import com.dubu.backend.todo.dto.request.UpdateTodoRequest;
import com.dubu.backend.todo.dto.response.CreateTodoResponse;
import com.dubu.backend.todo.entity.*;
import com.dubu.backend.todo.exception.AlreadyAddedTodoFromArchivedException;
import com.dubu.backend.todo.exception.NotFoundCategoryException;
import com.dubu.backend.todo.exception.NotFoundScheduleException;
import com.dubu.backend.todo.exception.NotFoundTodoException;
import com.dubu.backend.todo.repository.CategoryRepository;
import com.dubu.backend.todo.repository.ScheduleRepository;
import com.dubu.backend.todo.repository.TodoRepository;
import com.dubu.backend.todo.service.TodoManagementService;
import com.dubu.backend.todo.service.resolver.ScheduledDateResolver;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
@Transactional
public class TodoManagementServiceImpl implements TodoManagementService {
    private final TodoRepository todoRepository;
    private final CategoryRepository categoryRepository;
    private final MemberRepository memberRepository;
    private final ScheduleRepository scheduleRepository;

    @Override
    public CreateTodoResponse createTodo(Long memberId, String todoType, CreateTodoRequest createTodoRequest) {
        Member member = memberRepository.findById(memberId).orElseThrow(NotFoundMemberException::new);
        Category category = categoryRepository.findByName(createTodoRequest.category()).orElseThrow(NotFoundCategoryException::new);

        // 내일 할 일 데이터 생성의 경우 내일 스케줄이 있는지를 조회하고 없으면 생성한다.
        if(todoType.equals("tomorrow")){
            boolean hasSchedule = scheduleRepository.findScheduleByMemberAndDate(member, ScheduledDateResolver.resolveScheduledDate(todoType)).isPresent();

            if(!hasSchedule){
                Schedule newSchedule = Schedule.of(LocalDate.now().plusDays(1), member);
                scheduleRepository.save(newSchedule);
            }
        }
        Schedule schedule = null;

        // 오늘 할 일 혹은 내일 할 일 생성의 경우 최신의 스케줄을 조회한다.
        if(todoType.equals("today") || todoType.equals("tomorrow")){
            schedule = scheduleRepository.findFirstScheduleByMemberAndDateOrderByDateDesc(member, ScheduledDateResolver.resolveScheduledDate(todoType)).orElseThrow(NotFoundScheduleException::new);
        }
        Todo todo = createTodoRequest.toEntity(member, category, schedule, todoType);
        Todo savedTodo = todoRepository.save(todo);

        return CreateTodoResponse.fromEntity(savedTodo);
    }

    @Override
    public CreateTodoResponse createTodoFromArchived(Long memberId, String todoType, CreateTodoFromArchivedRequest todoCreateRequest) {
        Member member = memberRepository.findById(memberId).orElseThrow(NotFoundMemberException::new);
        Todo parentTodo = todoRepository.findByIdWithCategory(todoCreateRequest.todoId()).orElseThrow(NotFoundTodoException::new);

        // 내일 할 일 데이터 생성의 경우 내일 스케줄이 있는지를 조회하고 없으면 생성한다.
        if(todoType.equals("tomorrow")){
            boolean hasSchedule = scheduleRepository.findScheduleByMemberAndDate(member, ScheduledDateResolver.resolveScheduledDate(todoType)).isPresent();

            if(!hasSchedule){
                Schedule newSchedule = Schedule.of(LocalDate.now().plusDays(1), member);
                scheduleRepository.save(newSchedule);
            }
        }
        Schedule schedule = null;

        // 오늘 할 일 혹은 내일 할 일 생성의 경우 최신의 스케줄을 조회한다.
        if(todoType.equals("today") || todoType.equals("tomorrow")){
            schedule = scheduleRepository.findFirstScheduleByMemberAndDateOrderByDateDesc(member, ScheduledDateResolver.resolveScheduledDate(todoType)).orElseThrow(NotFoundScheduleException::new);

            todoRepository.findByParentTodoAndSchedule(parentTodo, schedule).ifPresent(todo -> {throw new AlreadyAddedTodoFromArchivedException();});

        }
        Todo newTodo = Todo.of(parentTodo.getTitle(), TodoType.get(todoType), parentTodo.getDifficulty(), parentTodo.getMemo(), member, parentTodo.getCategory(), parentTodo, schedule);
        Todo savedTodo = todoRepository.save(newTodo);

        return CreateTodoResponse.fromEntity(savedTodo);
    }

    @Override
    public void modifyTodo(Long memberId, Long todoId, UpdateTodoRequest updateTodoRequest) {
        Member member = memberRepository.findById(memberId).orElseThrow(NotFoundMemberException::new);
        Todo todo = todoRepository.findById(todoId).orElseThrow(NotFoundTodoException::new);

        if(updateTodoRequest.title() != null || updateTodoRequest.category() != null || updateTodoRequest.difficulty() != null){
            TodoType type = todo.getType();

            // 오늘, 내일 할 일의 경우 부모 할 일을 제거한다.
            if (type.equals(TodoType.SCHEDULED)){
                todo.clearParentTodo();
            }
            // 즐겨찾기 할 일의 경우
            else if(type.equals(TodoType.SAVE)){
                // 즐겨찾기에서 추가한 내일 할 일이 있으면 내일 할 일의 부모 아이디 제거
                todoRepository.findByParentTodoAndScheduleDate(todo, LocalDate.now().plusDays(1)).ifPresent(Todo::clearParentTodo);

                // 오늘 스케줄 조회
                Schedule todaySchedule = scheduleRepository.findFirstScheduleByMemberAndDateOrderByDateDesc(member, LocalDate.now()).orElseThrow(NotFoundScheduleException::new);

                // 즐겨찾기에서 추가한 오늘 할 일이 있으면 오늘 할 일의 부모 아이디 제거
                todoRepository.findByParentTodoAndSchedule(todo, todaySchedule).ifPresent(Todo::clearParentTodo);
            }
        }
        // 수정
        Category category = null;

        if(updateTodoRequest.category() != null){
            category = categoryRepository.findByName(updateTodoRequest.category()).orElseThrow(NotFoundCategoryException::new);
        }
        TodoDifficulty difficulty = null;

        if(updateTodoRequest.difficulty() != null){
            difficulty = TodoDifficulty.valueOf(updateTodoRequest.difficulty());
        }

        todo.updateTodo(updateTodoRequest.title(), category, difficulty, updateTodoRequest.memo());
    }

    @Override
    public void removeTodo(Long memberId, Long todoId) {
        Member member = memberRepository.findById(memberId).orElseThrow(NotFoundMemberException::new);
        Todo todo = todoRepository.findById(todoId).orElseThrow(NotFoundTodoException::new);

        todoRepository.delete(todo);
    }
}
