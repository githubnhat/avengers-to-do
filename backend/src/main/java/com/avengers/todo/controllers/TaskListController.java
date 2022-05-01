package com.avengers.todo.controllers;
import com.avengers.todo.common.ErrorResponse;
import com.avengers.todo.entity.TaskList;
import com.avengers.todo.payloads.ResponseObject;
import com.avengers.todo.payloads.TaskListRequest;
import com.avengers.todo.payloads.UpdateTaskListRequest;
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
            return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject("OK", "Create task list successfully", taskListService.createTaskList(request)));
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ResponseObject("failed", "Cannot create task list", ""));
        }


    }

    @GetMapping(path = "{boardsId}")
    public ResponseEntity<?> getAllTaskList(@PathVariable Long boardsId){
        try {
            return ResponseEntity.ok(taskListService.getAllTaskList(boardsId));
        } catch (Exception ex) {
            log.error("API /api/v1/boards: ", ex);
            return ResponseEntity.badRequest().body(ErrorResponse.builder().message(ex.getMessage()).build());
        }
    }

    @PutMapping()
    public ResponseEntity<?> updateTaskList(
            @RequestBody UpdateTaskListRequest updateTaskListRequest
            ){
        try {
            taskListService.updateTaskList(updateTaskListRequest);
            return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject("OK", "Update task list successfully", ""));
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ResponseObject("Failed", "Cannot update task list", ""));
        }
    }

    @DeleteMapping (path = "{taskListID}")
    public ResponseEntity<?> deleteTaskList(@PathVariable Long taskListID){
        try {
            taskListService.deleteTaskList(taskListID);
            return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject("OK", "Delete task list successfully", ""));
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ResponseObject("Failed", "Cannot delete task list", ""));
        }
    }



}
