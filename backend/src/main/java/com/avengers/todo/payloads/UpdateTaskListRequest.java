package com.avengers.todo.payloads;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateTaskListRequest {
    private Long TaskListId;
    private String title;
}
