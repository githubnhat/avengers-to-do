package com.avengers.todo.controllers;

import com.avengers.todo.common.ErrorResponse;
import com.avengers.todo.payloads.InvitationRequest;
import com.avengers.todo.payloads.UpdateInvitationRequest;
import com.avengers.todo.services.InvitationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/invitation")
@Slf4j
public class InvitationController {

    private final InvitationService invitationService;

    @GetMapping("/board/{id}/users")
    public ResponseEntity<?> getUsersCanInvite(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(invitationService.getUsersCanInvite(id));
        } catch (IllegalStateException ex) {
            log.error("API getUsersCanInvite invitation/board", ex);
            return ResponseEntity.badRequest().body(ErrorResponse.builder().message(ex.getMessage()).build());
        } catch (Exception ex) {
            log.error("API getUsersCanInvite invitation/board", ex);
            return ResponseEntity.badRequest().body(ErrorResponse.builder().message("Server Error").build());
        }
    }

    @PostMapping
    public ResponseEntity<?> inviteUsers(@RequestBody InvitationRequest request) {
        try {
            invitationService.addUsersToBoard(request);
            return ResponseEntity.ok().build();
        } catch (IllegalStateException ex) {
            log.error("API addUsersToBoard /users", ex);
            return ResponseEntity.badRequest().body(ErrorResponse.builder().message(ex.getMessage()).build());
        } catch (Exception ex) {
            log.error("API addUsersToBoard /users", ex);
            return ResponseEntity.badRequest().body(ErrorResponse.builder().message("Server Error").build());
        }
    }

    @GetMapping
    public ResponseEntity<?> getInvitation() {
        try {
            return ResponseEntity.ok(invitationService.getInvitation());
        } catch (Exception ex) {
            log.error("API getInvitation /invitation", ex);
            return ResponseEntity.badRequest().body(ErrorResponse.builder().message("Server Error").build());
        }
    }

    @PutMapping
    public ResponseEntity<?> updateInvitation(@RequestBody UpdateInvitationRequest request) {
        try {
            invitationService.updateInvitation(request);
            return ResponseEntity.ok().build();
        } catch (IllegalStateException ex) {
            log.error("API updateInvitation /invitation", ex);
            return ResponseEntity.badRequest().body(ErrorResponse.builder().message(ex.getMessage()).build());
        } catch (Exception ex) {
            log.error("API updateInvitation /invitation", ex);
            return ResponseEntity.badRequest().body(ErrorResponse.builder().message("Server Error").build());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteInvitation(@PathVariable Long id) {
        try {
            invitationService.deleteInvitation(id);
            return ResponseEntity.ok().build();
        } catch (IllegalStateException ex) {
            log.error("API deleteInvitation /invitation", ex);
            return ResponseEntity.badRequest().body(ErrorResponse.builder().message(ex.getMessage()).build());
        } catch (Exception ex) {
            log.error("API deleteInvitation /invitation", ex);
            return ResponseEntity.badRequest().body(ErrorResponse.builder().message("Server Error").build());
        }
    }
}
