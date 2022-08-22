package com.avengers.todo.payloads;


import com.avengers.todo.entity.Users;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter
public class UpdateTaskRequest {
    private Long taskId;
    private String name;
    private String description;
    private Boolean isDone;
    @JsonFormat(pattern="yyyy-MM-dd")
    private Date deadline;
    private List<Users> usersList;
}
