package com.avengers.todo.payloads;

import com.avengers.todo.entity.Users;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
public class CreateTask {
    private Long taskListId;
    private String name;
    private String description;
    private List<Users> usersList;
    private String deadline;
}
