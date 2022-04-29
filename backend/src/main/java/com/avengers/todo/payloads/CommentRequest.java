package com.avengers.todo.payloads;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class CommentRequest {
    private String content;
    private Long user_id;
    private Long task_id;

}
