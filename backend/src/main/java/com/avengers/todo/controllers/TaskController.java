package com.avengers.todo.controllers;

import com.avengers.todo.common.ErrorResponse;
import com.avengers.todo.payloads.CreateTask;
import com.avengers.todo.payloads.ResponseObject;
import com.avengers.todo.services.TaskService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/tasks")
@Slf4j
public class TaskController {
    private final TaskService taskService;

    @PostMapping
    public ResponseEntity<?> create(@RequestBody CreateTask request) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject("OK", "Create Task Success", taskService.create(request)));
        } catch (Exception ex) {
            log.error("tasks", ex);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ResponseObject("Error", "Can't Create Task", ""));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getTask(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(taskService.getTask(id));
        } catch (Exception ex) {
            log.error("Get task details: ", ex);
            return ResponseEntity.badRequest().body(ErrorResponse.builder().message("Server Error"));
        }
    }

}
