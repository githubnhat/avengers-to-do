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
public class TaskListResponse {
    private Long id;
    private String title;
    private List<TaskReponse> listTask;
}
