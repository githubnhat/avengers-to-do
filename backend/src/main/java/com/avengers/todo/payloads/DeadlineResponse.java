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
    private long boardId;
    private Long taskID;
    private String title;
    private Long taskListId;
    private String taskName;
    private String description;
    @JsonFormat(pattern="yyyy-MM-dd")
    private Date deadline;
    private boolean isDone;
}