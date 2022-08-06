package com.avengers.todo.payloads;

import com.avengers.todo.entity.Users;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@Builder
public class CreateTask {
    private Long taskListId;
    private String name;
    private String description;
    private List<Users> usersList;
    @JsonFormat(pattern="dd/MM/yyyy", shape= JsonFormat.Shape.STRING)
    private String deadline;
}
