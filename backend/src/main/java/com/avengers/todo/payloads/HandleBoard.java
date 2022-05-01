package com.avengers.todo.payloads;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class HandleBoard {
    private Long id;
    private String name;
    private String description;

}
