package com.avengers.todo.controllers;

import com.avengers.todo.common.ErrorResponse;
import com.avengers.todo.entity.Comment;
import com.avengers.todo.payloads.CommentRequest;
import com.avengers.todo.payloads.ResponseObject;
import com.avengers.todo.repositories.CommentRepository;
import com.avengers.todo.services.CommentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/comment")
@RequiredArgsConstructor
@Slf4j
public class CommentController {

private final CommentService commentService;
    @PostMapping
    public ResponseEntity<?> create(@RequestBody CommentRequest request) {
        try {
            commentService.create(request);
            return ResponseEntity.ok().build();
        } catch (Exception ex) {
            log.error("API /api/v1/comment: ", ex);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ResponseObject("failed", "Cannot Create Comment", ""));
        }
    }
}
