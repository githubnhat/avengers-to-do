package com.avengers.todo.controllers;

import com.avengers.todo.common.ErrorResponse;
import com.avengers.todo.payloads.CreateTask;
import com.avengers.todo.payloads.ResponseObject;
import com.avengers.todo.payloads.UpdateTaskListRequest;
import com.avengers.todo.payloads.UpdateTaskRequest;
import com.avengers.todo.services.TaskService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.format.annotation.DateTimeFormat;
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
        } catch (IllegalArgumentException e) {
            log.error("Get task details: ", e);
            return ResponseEntity.badRequest().body(ErrorResponse.builder().message(e.getMessage()).build());
        } catch (Exception ex) {
            log.error("Get task details: ", ex);
            return ResponseEntity.badRequest().body(ErrorResponse.builder().message("Server Error").build());
        }
    }

    @PutMapping()
    public ResponseEntity<?> updateTask(
            @RequestBody UpdateTaskRequest updateTaskRequest
    ) {
        try {
            taskService.updateTask(updateTaskRequest);
            return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject("OK", "Update task successfully", ""));
        } catch (Exception ex) {
            log.error("tasks", ex);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ResponseObject("Failed", "Cannot update task", ""));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        try {
            taskService.delete(id);
            return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject("OK", "Delete task successfully", ""));
        } catch (Exception ex) {
            log.error("tasks", ex);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ResponseObject("Failed", "Cannot Delete task", ""));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> changeId(@PathVariable Long id, @RequestBody UpdateTaskListRequest request) {
        try {
            taskService.changeId(id, request);
            return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject("OK", "Change task successfully", ""));
        } catch (Exception ex) {
            log.error("tasks", ex);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ResponseObject("Failed", "Cannot Change task", ""));
        }
    }

    @GetMapping(path = "/deadline")
    public ResponseEntity<?> getDeadlineList(@RequestParam int month, @RequestParam int year, @RequestParam int boardID) {
//        try {
            return ResponseEntity.ok(taskService.getDeadlineList(month, year, boardID));
//        } catch (Exception ex) {
//            return ResponseEntity.badRequest().body(new ResponseObject("Failed", "Cannot get deadline task list", ""));
//        }
    }
}
