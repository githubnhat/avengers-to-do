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
public class CommentResponse {
    private Long id;
    private String fullName;
    private String content;
    private Date createdDate;
}
