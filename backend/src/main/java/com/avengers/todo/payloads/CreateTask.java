package com.avengers.todo.payloads;

import com.avengers.todo.entity.Users;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;


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

    @DateTimeFormat(pattern = "dd.MM.yyyy")
    private Date deadline;
}
