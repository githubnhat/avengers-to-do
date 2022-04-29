package com.avengers.todo.controllers;
import com.avengers.todo.common.ErrorResponse;
import com.avengers.todo.entity.TaskList;
import com.avengers.todo.payloads.ResponseObject;
import com.avengers.todo.payloads.TaskListRequest;
import com.avengers.todo.services.TaskListService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/taskList")
@Slf4j
public class TaskListController {

    private final TaskListService taskListService;

    @PostMapping
    public ResponseEntity<?> createTaskList(@RequestBody TaskListRequest request) {

        try {
            return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject("OK", "Creating task list is successfully", taskListService.createTaskList(request)));
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ResponseObject("failed", "Cannot create task list", ""));
        }


    }

    @GetMapping(path = "{boardsId}")
    public ResponseEntity<?> getAllTaskList(@PathVariable Long boardsId){
//        try {
//            return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject("OK", "Getting all task list is successfully", taskListService.getAllTaskList(boardsId)));
//        } catch (Exception ex) {
//            log.error("API /api/v1/boards: ", ex);
//            return ResponseEntity.badRequest().body(ErrorResponse.builder().message(ex.getMessage()).build());
//        }

        boolean exists = false;

        try {
            return ResponseEntity.ok(taskListService.getAllTaskList(boardsId));
        } catch (Exception ex) {
            log.error("API /api/v1/boards: ", ex);
            return ResponseEntity.badRequest().body(ErrorResponse.builder().message(ex.getMessage()).build());
        }
    }
}
