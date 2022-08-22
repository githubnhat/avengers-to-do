package com.avengers.todo.payloads;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;


@Getter
@Setter
@Builder
@AllArgsConstructor
public class GetBoardIdResponse {
    private Long id;
    private String name;
    private String description;
    private String createdBy;
    private Date createdDate;
    private Double percentDone;
}
