package com.avengers.todo.payloads;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
public class UpdateInvitationRequest {
    private Long invitationId;
    private String status;
}
