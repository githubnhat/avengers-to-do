package com.avengers.todo.payloads;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class TaskReponse {
    private Long id;
    private String name;
    private String description;
    private Boolean isDone;
}
