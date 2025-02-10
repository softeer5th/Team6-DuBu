package com.dubu.backend.todo.service.impl;

import com.dubu.backend.member.domain.Member;
import com.dubu.backend.member.exception.MemberNotFoundException;
import com.dubu.backend.member.infra.repository.MemberRepository;
import com.dubu.backend.todo.dto.common.TodoIdentifier;
import com.dubu.backend.todo.dto.request.TodoCreateFromArchivedRequest;
import com.dubu.backend.todo.dto.request.TodoCreateRequest;
import com.dubu.backend.todo.dto.request.TodoUpdateRequest;
import com.dubu.backend.todo.dto.response.TodoInfo;
import com.dubu.backend.todo.dto.response.TodoManageResult;
import com.dubu.backend.todo.entity.*;
import com.dubu.backend.todo.exception.*;
import com.dubu.backend.todo.repository.CategoryRepository;
import com.dubu.backend.todo.repository.ScheduleRepository;
import com.dubu.backend.todo.repository.TodoRepository;
import com.dubu.backend.todo.service.TodoManagementService;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class TomorrowTodoManagementService implements TodoManagementService {
    private final MemberRepository memberRepository;
    private final CategoryRepository categoryRepository;
    private final TodoRepository todoRepository;
    private final ScheduleRepository scheduleRepository;
    private final EntityManager entityManager;

    @Override
    public TodoManageResult<?> createTodo(TodoIdentifier identifier, TodoCreateRequest todoCreateRequest) {
        Member member = memberRepository.findById(identifier.memberId()).orElseThrow(() -> new MemberNotFoundException(identifier.memberId()));
        Category category = categoryRepository.findByName(todoCreateRequest.category()).orElseThrow(() -> new CategoryNotFoundException(todoCreateRequest.category()));
        Schedule schedule = scheduleRepository.findLatestSchedule(member, LocalDate.now().plusDays(1)).orElseThrow(ScheduleNotFoundException::new);

        List<Todo> todos = todoRepository.findTodosWithCategoryBySchedule(schedule);
        List<Todo> tomorrowTodos = null;

        // 할 일 3개 이미 존재
        if(todos.size() == 3){
            throw new TodoLimitExceededException("내일", 3);
        }

        // 내일 스케줄이 없는 경우
        if(!schedule.getDate().equals(LocalDate.now().plusDays(1))){
            schedule = createTomorrowSchedule(member);
            tomorrowTodos = createTomorrowTodosFromTodayTodos(schedule, todos);
        }

        Todo newTodo = todoCreateRequest.toEntity(member, category, schedule, null, TodoType.SCHEDULED);
        Todo savedTodo = todoRepository.save(newTodo);

        if(tomorrowTodos != null) {
            tomorrowTodos.add(savedTodo);
            return TodoManageResult.of(true, TodoInfo.fromEntities(tomorrowTodos));
        }
        return TodoManageResult.of(false, TodoInfo.fromEntity(savedTodo));
    }

    @Override
    public TodoManageResult<?> createTodoFromArchived(TodoIdentifier identifier, TodoCreateFromArchivedRequest todoCreateRequest) {
        Member member = memberRepository.findById(identifier.memberId()).orElseThrow(() -> new MemberNotFoundException(identifier.memberId()));
        Schedule schedule = scheduleRepository.findLatestSchedule(member, LocalDate.now().plusDays(1)).orElseThrow(ScheduleNotFoundException::new);

        List<Todo> todos = todoRepository.findTodosWithCategoryBySchedule(schedule);
        List<Todo> tomorrowTodos = null;

        // 할 일 3개 이미 존재
        if(todos.size() == 3){
            throw new TodoLimitExceededException("내일", 3);
        }

        // 내일 스케줄이 없는 경우
        if(!schedule.getDate().equals(LocalDate.now().plusDays(1))) {
            schedule = createTomorrowSchedule(member);
            tomorrowTodos = createTomorrowTodosFromTodayTodos(schedule, todos);
        }

        Todo parentTodo = todoRepository.findWithCategoryById(todoCreateRequest.todoId()).orElseThrow(TodoNotFoundException::new);
        // 해당 할 일이 이미 추가됐는지 확인
        todoRepository.findByParentTodoAndSchedule(parentTodo, schedule).ifPresent(todo -> {throw new AlreadyAddedTodoFromArchivedException();});

        Todo newTodo = Todo.of(parentTodo.getTitle(), TodoType.SCHEDULED, parentTodo.getDifficulty(), parentTodo.getMemo(), member, parentTodo.getCategory(), parentTodo, schedule, null);
        Todo savedTodo = todoRepository.save(newTodo);

        if(tomorrowTodos != null){
            tomorrowTodos.add(savedTodo);
            return TodoManageResult.of(true, TodoInfo.fromEntities(tomorrowTodos));
        }
        return TodoManageResult.of(false, TodoInfo.fromEntity(savedTodo));
    }

    @Override
    public TodoManageResult<?> modifyTodo(TodoIdentifier identifier, TodoUpdateRequest todoUpdateRequest) {
        Member member = memberRepository.findById(identifier.memberId()).orElseThrow(() -> new MemberNotFoundException(identifier.memberId()));
        Todo targetTodo = todoRepository.findById(identifier.todoId()).orElseThrow(TodoNotFoundException::new);
        Schedule schedule = scheduleRepository.findLatestSchedule(member, LocalDate.now().plusDays(1)).orElseThrow(ScheduleNotFoundException::new);

        List<Todo> tomorrowTodos = null;

        // 내일 스케줄이 없는 경우
        if(!schedule.getDate().equals(LocalDate.now().plusDays(1))){
            List<Todo> todayTodos = todoRepository.findTodosWithCategoryBySchedule(schedule);
            // 내일 스케줄 생성
            Schedule tomorrowSchedule = createTomorrowSchedule(member);

            int targetTodoIndex = 0;

            // 수정 시 할 일 순서를 유지하기 위하여 수정할 할 일 순서 기록
            for (int i = 0; i < todayTodos.size(); i++) {
                if(targetTodo.getId().equals(todayTodos.get(i).getId())){
                    targetTodoIndex = i;
                    break;
                }
            }
            tomorrowTodos = createTomorrowTodosFromTodayTodos(tomorrowSchedule, todayTodos);
            targetTodo = tomorrowTodos.get(targetTodoIndex);
        }

        // 제목, 카테고리, 난이도 수정 시 부모 할 일 관계과의 끊기
        if(todoUpdateRequest.title() != null || todoUpdateRequest.category() != null || todoUpdateRequest.difficulty() != null){
            targetTodo.clearParentTodo();
        }

        // 수정
        Category category = null;
        if(todoUpdateRequest.category() != null){
            category = categoryRepository.findByName(todoUpdateRequest.category()).orElseThrow(() -> new CategoryNotFoundException(todoUpdateRequest.category()));
        }

        TodoDifficulty difficulty = null;
        if(todoUpdateRequest.difficulty() != null){
            difficulty = TodoDifficulty.valueOf(todoUpdateRequest.difficulty().toUpperCase());
        }

        targetTodo.updateTodo(todoUpdateRequest.title(), category, difficulty, todoUpdateRequest.memo());

        if(tomorrowTodos != null)
            return TodoManageResult.of(true, TodoInfo.fromEntities(tomorrowTodos));

        return TodoManageResult.of(false, TodoInfo.fromEntity(targetTodo));
    }

    @Override
    public TodoManageResult<?> removeTodo(TodoIdentifier identifier) {
        Member member = memberRepository.findById(identifier.memberId()).orElseThrow(() -> new MemberNotFoundException(identifier.memberId()));
        Todo targetTodo = todoRepository.findById(identifier.todoId()).orElseThrow(TodoNotFoundException::new);
        Schedule schedule = scheduleRepository.findLatestSchedule(member, LocalDate.now().plusDays(1)).orElseThrow(ScheduleNotFoundException::new);

        // 내일 스케줄이 없는 경우
        if(!schedule.getDate().equals(LocalDate.now().plusDays(1))){
            List<Todo> todayTodos = todoRepository.findTodosWithCategoryBySchedule(schedule);

            Schedule tomorrowSchedule = createTomorrowSchedule(member);

            // 삭제할 Todo 빼고 담기
            List<Todo> tomorrowTodos = new ArrayList<>();
            for(Todo todo: todayTodos){
                if(!todo.getId().equals(targetTodo.getId()))
                    tomorrowTodos.add(todo);
            }

            tomorrowTodos = createTomorrowTodosFromTodayTodos(tomorrowSchedule, tomorrowTodos);
            return TodoManageResult.of(true, TodoInfo.fromEntities(tomorrowTodos));
        }
        todoRepository.delete(targetTodo);
        return TodoManageResult.of(false, null);
    }

    private Schedule createTomorrowSchedule(Member member){
        Schedule schedule = Schedule.of(LocalDate.now().plusDays(1), member);
        return scheduleRepository.save(schedule);
    }

    private List<Todo> createTomorrowTodosFromTodayTodos(Schedule tomorrowSchedule, List<Todo> todayTodos){
        List<Todo> tomorrowTodos = todayTodos.stream().map(t -> Todo.of(t.getTitle(), TodoType.SCHEDULED, t.getDifficulty(), t.getMemo(), t.getMember(), t.getCategory(), t.getParentTodo(), tomorrowSchedule, t.getPath())).toList();
        return todoRepository.saveAll(tomorrowTodos);
    }
}
