package com.dubu.backend.todo.controller;

import com.dubu.backend.global.domain.PageResponse;
import com.dubu.backend.global.domain.SuccessResponse;
import com.dubu.backend.todo.dto.request.CreateTodoFromArchivedRequest;
import com.dubu.backend.todo.dto.request.CreateTodoRequest;
import com.dubu.backend.todo.dto.request.SaveTodoQueryRequest;
import com.dubu.backend.todo.dto.request.UpdateTodoRequest;
import com.dubu.backend.todo.dto.response.TodoInfo;
import com.dubu.backend.todo.service.TodoManagementService;
import com.dubu.backend.todo.service.TodoQueryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/todos")
@RequiredArgsConstructor
public class TodoController {
    private final TodoManagementService todoManagementService;
    private final TodoQueryService todoQueryService;

    @PostMapping("/{type}/manual")
    @ResponseStatus(HttpStatus.CREATED)
    public SuccessResponse<TodoInfo> postTodo(@RequestAttribute Long memberId, @PathVariable("type") String type, @RequestBody CreateTodoRequest request){
        return new SuccessResponse<>(todoManagementService.createTodo(memberId, type, request));
    }

    @PostMapping("/{type}/from-archived")
    @ResponseStatus(HttpStatus.CREATED)
    public SuccessResponse<TodoInfo> postTodoFromArchived(@RequestAttribute Long memberId, @PathVariable("type") String type, @RequestBody CreateTodoFromArchivedRequest request){
        return new SuccessResponse<>(todoManagementService.createTodoFromArchived(memberId, type, request));
    }

    @PatchMapping("/{todoId}")
    public SuccessResponse<TodoInfo> patchTodo(@RequestAttribute Long memberId, @PathVariable("todoId")Long todoId, @RequestBody UpdateTodoRequest request){
        return new SuccessResponse<>(todoManagementService.modifyTodo(memberId, todoId, request));
    }

    @DeleteMapping("/{todoId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteTodo(@RequestAttribute Long memberId, @PathVariable("todoId")Long todoId){
        todoManagementService.removeTodo(memberId, todoId);
    }

    @GetMapping("/today")
    public SuccessResponse<List<TodoInfo>> getTodayTodos(@RequestAttribute Long memberId){
        return new SuccessResponse<>(todoQueryService.findTodayTodos(memberId));
    }

    @GetMapping("/tomorrow")
    public SuccessResponse<List<TodoInfo>> getTomorrowTodos(@RequestAttribute Long memberId){
        return new SuccessResponse<>(todoQueryService.findTomorrowTodos(memberId));
    }

    @GetMapping("/save")
    public PageResponse<List<TodoInfo>> getSaveTodos(@RequestAttribute Long memberId, @ModelAttribute SaveTodoQueryRequest request){
        return todoQueryService.findSaveTodos(memberId, request);
    }
}
