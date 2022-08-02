package com.avengers.todo.payloads;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DeadlineResponse {
    private long board_id;
    private String username;
    private String title;
    private long task_list_id;
    private String description;
    private String task_name;
    private Date deadline;
    private boolean isDone;
}
