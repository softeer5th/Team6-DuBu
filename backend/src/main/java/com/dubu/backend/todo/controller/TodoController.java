package com.dubu.backend.todo.controller;

import com.dubu.backend.global.domain.PageResponse;
import com.dubu.backend.global.domain.SuccessResponse;
import com.dubu.backend.todo.dto.common.Cursor;
import com.dubu.backend.todo.dto.common.TodoIdentifier;
import com.dubu.backend.todo.dto.enums.TodoRequestType;
import com.dubu.backend.todo.dto.request.*;
import com.dubu.backend.todo.dto.response.TodoInfo;
import com.dubu.backend.todo.dto.response.TodoManageResult;
import com.dubu.backend.todo.dto.response.TodoSuccessResponse;
import com.dubu.backend.todo.registry.TodoManagementServiceRegistry;
import com.dubu.backend.todo.service.TodoManagementService;
import com.dubu.backend.todo.service.TodoQueryService;
import jakarta.annotation.Nullable;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/todos")
@RequiredArgsConstructor
public class TodoController {
    private final TodoQueryService todoQueryService;
    private final TodoManagementServiceRegistry todoManagementServiceRegistry;

    @PostMapping("/{type}/manual")
    @ResponseStatus(HttpStatus.CREATED)
        public TodoSuccessResponse<?> postTodo(
                @RequestAttribute Long memberId,
                @PathVariable("type")TodoRequestType type,
                @Nullable @RequestParam("pathId") Long pathId,
                @RequestBody TodoCreateRequest request)
    {
        TodoManagementService todoManagementService = todoManagementServiceRegistry.getService(type.getManagementServiceName());
        TodoManageResult<?> result = todoManagementService.createTodo(new TodoIdentifier(memberId, null, pathId), request);

        return new TodoSuccessResponse<>(result.isTomorrowScheduleCreated(), result.info());
    }

    @PostMapping("/{type}/from-archived")
    @ResponseStatus(HttpStatus.CREATED)
    public TodoSuccessResponse<?> postTodoFromArchived(
            @RequestAttribute Long memberId,
            @PathVariable("type")TodoRequestType type,
            @Nullable @RequestParam("pathId") Long pathId,
            @RequestBody TodoCreateFromArchivedRequest request)
    {
        TodoManagementService todoManagementService = todoManagementServiceRegistry.getService(type.getManagementServiceName());
        TodoManageResult<?> result = todoManagementService.createTodoFromArchived(new TodoIdentifier(memberId, null, pathId), request);

        return new TodoSuccessResponse<>(result.isTomorrowScheduleCreated(), result.info());
    }

    @PatchMapping("/{todoId}")
    public ResponseEntity<?> patchTodo(
            @RequestAttribute Long memberId,
            @PathVariable("todoId")Long todoId,
            @RequestParam("type") TodoRequestType type,
            @RequestBody TodoUpdateRequest request)
    {
        TodoManagementService todoManagementService = todoManagementServiceRegistry.getService(type.getManagementServiceName());
        TodoManageResult<?> result = todoManagementService.modifyTodo(new TodoIdentifier(memberId, todoId, null), request);

        if(result.isTomorrowScheduleCreated())
            return ResponseEntity.status(HttpStatus.CREATED).body(new TodoSuccessResponse<>(true, result.info()));

        return ResponseEntity.status(HttpStatus.OK).body(new TodoSuccessResponse<>(false, result.info()));
    }

    @DeleteMapping("/{todoId}")
    public ResponseEntity<?> deleteTodo(
            @RequestAttribute Long memberId,
            @PathVariable("todoId")Long todoId,
            @RequestParam("type") TodoRequestType type)
    {
        TodoManagementService todoManagementService = todoManagementServiceRegistry.getService(type.getManagementServiceName());
        TodoManageResult<?> result = todoManagementService.removeTodo(new TodoIdentifier(memberId, todoId, null));

        if(result.isTomorrowScheduleCreated())
            return ResponseEntity.status(HttpStatus.CREATED).body(new TodoSuccessResponse<>(true, result.info()));

        return ResponseEntity.status(HttpStatus.OK).body(new TodoSuccessResponse<>(false, result.info()));
    }

    @GetMapping("/today")
    public SuccessResponse<List<TodoInfo>> getTodayTodos(
            @RequestAttribute Long memberId)
    {
        return new SuccessResponse<>(todoQueryService.findTodayTodos(memberId));
    }

    @GetMapping("/tomorrow")
    public SuccessResponse<List<TodoInfo>> getTomorrowTodos(
            @RequestAttribute Long memberId)
    {
        return new SuccessResponse<>(todoQueryService.findTomorrowTodos(memberId));
    }

    @GetMapping("/save")
    public PageResponse<Long, List<TodoInfo>> getSaveTodos(
            @RequestAttribute Long memberId,
            @Nullable @RequestParam("cursor") Long cursor,
            @ModelAttribute SaveTodoQueryRequest request)
    {
        return todoQueryService.findSaveTodos(memberId, cursor, request);
    }

    @GetMapping("/recommend/personalized")
        public SuccessResponse<List<TodoInfo>> getLimitedRecommendTodos(
            @RequestAttribute Long memberId)
    {
        return new SuccessResponse<>(todoQueryService.findRandomRecommendTodos(memberId));
    }

    @GetMapping("/recommend/all")
    public PageResponse<Cursor, List<TodoInfo>> getAllRecommendTodos(
            @Nullable @ModelAttribute Cursor cursor,
            @ModelAttribute RecommendTodoQueryRequest request)
    {
        return todoQueryService.findAllRecommendTodos(cursor, request);
    }

    @GetMapping("/path")
    public SuccessResponse<List<TodoInfo>> getTodosByPath(
            @RequestAttribute("memberId") Long memberId,
            @RequestParam("pathId") Long pathId)
    {
        return new SuccessResponse<>(todoQueryService.findTodosByPath(memberId, pathId));
    }
}
