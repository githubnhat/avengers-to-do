package com.avengers.todo.payloads;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateTaskRequest {
    private Long taskId;
    private String name;
    private String description;
    private Boolean isDone;
    private String deadline;
}
