package com.avengers.todo.controllers;
import com.avengers.todo.common.ErrorResponse;
import com.avengers.todo.entity.TaskList;
import com.avengers.todo.payloads.TaskListRequest;
import com.avengers.todo.services.TaskListService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
@Slf4j
public class TaskListController {

    private final TaskListService taskListService;

    @PostMapping("/taskList")
    public ResponseEntity<?> createTaskList(@RequestBody TaskListRequest request) {
        try {
            return ResponseEntity.ok(taskListService.createTaskList(request));
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body(ErrorResponse.builder()
                    .message(ex.getMessage())
                    .build());
        }
    }
}
