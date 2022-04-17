package com.avengers.todo.controllers;

import com.avengers.todo.common.ErrorResponse;
import com.avengers.todo.payloads.AuthRequest;
import com.avengers.todo.services.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {
        try {
            return ResponseEntity.ok(authService.login(request));
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body(ErrorResponse.builder()
                    .message(ex.getMessage())
                    .build());
        }
    }
}
