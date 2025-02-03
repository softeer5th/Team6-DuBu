package com.dubu.backend.todo.controller;

import com.dubu.backend.global.domain.SuccessResponse;
import com.dubu.backend.todo.dto.request.CreateTodoFromArchivedRequest;
import com.dubu.backend.todo.dto.request.CreateTodoRequest;
import com.dubu.backend.todo.dto.request.UpdateTodoRequest;
import com.dubu.backend.todo.dto.response.CreateTodoResponse;
import com.dubu.backend.todo.service.TodoManagementService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/todos")
@RequiredArgsConstructor
public class TodoController {
    private final TodoManagementService todoManagementService;

    @PostMapping("/{type}/manual")
    @ResponseStatus(HttpStatus.CREATED)
    public SuccessResponse<CreateTodoResponse> postTodo(@RequestAttribute Long memberId, @PathVariable("type") String type, @RequestBody CreateTodoRequest request){
        return new SuccessResponse<>(todoManagementService.createTodo(memberId, type, request));
    }

    @PostMapping("/{type}/from-archived")
    @ResponseStatus(HttpStatus.CREATED)
    public SuccessResponse<CreateTodoResponse> postTodoFromArchived(@RequestAttribute Long memberId, @PathVariable("type") String type, @RequestBody CreateTodoFromArchivedRequest request){
        return new SuccessResponse<>(todoManagementService.createTodoFromArchived(memberId, type, request));
    }

    @PatchMapping("/{todoId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void patchTodo(@RequestAttribute Long memberId, @PathVariable("todoId")Long todoId, @RequestBody UpdateTodoRequest request){
        todoManagementService.modifyTodo(memberId, todoId, request);
    }
}
