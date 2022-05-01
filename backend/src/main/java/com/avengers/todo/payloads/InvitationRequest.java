package com.avengers.todo.payloads;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@Builder
public class InvitationRequest {
    private Long boardId;
    private List<Long> usersId;
}
