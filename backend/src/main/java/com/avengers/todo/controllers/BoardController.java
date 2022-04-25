package com.avengers.todo.controllers;

import com.avengers.todo.common.ErrorResponse;
import com.avengers.todo.payloads.CreateBoardRequest;
import com.avengers.todo.payloads.ResponseObject;
import com.avengers.todo.services.BoardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;



@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/boards")
@Slf4j
public class BoardController {

    private final BoardService boardService;

    @PostMapping
    public ResponseEntity<?> create(@RequestBody CreateBoardRequest request) {
//        try {
//            return ResponseEntity.ok(boardService.create(request));
//        } catch (Exception ex) {
//            log.error("API /api/v1/boards: ", ex);
//            return ResponseEntity.badRequest().body(ErrorResponse.builder()
//                    .message(ex.getMessage())
//                    .build());
//        }
        try {
            return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject("OK", "Query Create Board Successfully", boardService.create(request)));
        } catch (Exception ex) {
            log.error("API /api/v1/boards: ", ex);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ResponseObject("failed", "Cannot Create", ""));
        }
    }

    @GetMapping
    public ResponseEntity<?> getAll() {
        try {
            return ResponseEntity.ok(boardService.getAll());
        } catch (Exception ex) {
            log.error("API /api/v1/boards: ", ex);
            return ResponseEntity.badRequest().body(ErrorResponse.builder().message(ex.getMessage()).build());
        }
    }
}
