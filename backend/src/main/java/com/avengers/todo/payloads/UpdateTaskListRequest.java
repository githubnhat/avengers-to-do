package com.avengers.todo.payloads;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateTaskListRequest {
    private Long taskListId;
    private String title;
}
