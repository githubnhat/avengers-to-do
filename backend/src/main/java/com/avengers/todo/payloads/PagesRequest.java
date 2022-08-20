package com.avengers.todo.payloads;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class PagesRequest {
    private int page;
    private int limit;
    private String sortBy;
    private int sortDesc;
}
