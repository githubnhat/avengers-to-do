package com.avengers.todo.payloads;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateBoardRequest {
    private String name;
    private String description;

}
