package com.avengers.todo.payloads;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TaskListRequest {
    private Long boardsId;
    private String title;
}
