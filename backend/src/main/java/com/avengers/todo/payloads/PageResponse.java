package com.avengers.todo.payloads;

import lombok.*;

import java.util.ArrayList;
import java.util.List;
@Builder
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PageResponse<T> {
    private int page;
    private int totalPages;
    private int totalItems;
    private List<T> data = new ArrayList<>();
}
