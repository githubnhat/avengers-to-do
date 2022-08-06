package com.avengers.todo.payloads;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DeadlineResponse {
    private int board_id;
    private String username;
    private String title;
    private int task_list_id;
    private String task_name;
    private String description;
    @JsonFormat(pattern="dd/MM/yyyy")
    private Date deadline;
    private boolean isDone;
}
