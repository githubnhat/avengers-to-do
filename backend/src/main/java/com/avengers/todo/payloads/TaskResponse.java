package com.avengers.todo.payloads;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class TaskResponse {
    private Long id;
    private String name;
    private String description;
    private Boolean isDone;
    private List<CommentResponse> comments;
}
