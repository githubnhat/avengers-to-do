package com.avengers.todo.payloads;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@Builder
public class UsersInBoardResponse {
    private Long userId;
    private Long invitationId;
    private String fullName;
    private Date joinDate;
    private Date inviteDate;
    private String status;
}