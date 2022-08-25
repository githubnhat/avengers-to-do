package com.avengers.todo.payloads;


import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class TaskResponse {
    private Long id;
    private String name;
    private String description;
    private Long taskListId;
    private Boolean isDone;
    private List<CommentResponse> comments;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date deadline;
    private List<UserResponse> usersList;
}
