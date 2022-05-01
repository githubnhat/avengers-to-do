package com.avengers.todo.payloads;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class UserInvitationResponse {
    private Long id;
    private String username;
    private String fullName;
}
