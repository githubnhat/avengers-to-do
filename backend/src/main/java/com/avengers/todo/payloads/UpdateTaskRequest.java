package com.avengers.todo.payloads;


import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class UpdateTaskRequest {
    private Long taskId;
    private String name;
    private String description;
    private Boolean isDone;
    private Date deadline;
}
