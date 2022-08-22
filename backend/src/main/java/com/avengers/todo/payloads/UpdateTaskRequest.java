package com.avengers.todo.payloads;


import com.fasterxml.jackson.annotation.JsonFormat;
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
    @JsonFormat(pattern="yyyy-MM-dd")
    private Date deadline;
}
