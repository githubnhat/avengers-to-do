package com.avengers.todo.payloads;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@Builder
public class InvitationResponse {
    private Long invitationId;
    private String inviter;
    private Date invitationTime;
    private String status;
    private String boardName;
}
