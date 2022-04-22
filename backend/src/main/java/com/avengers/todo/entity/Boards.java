package com.avengers.todo.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Boards extends BaseEntity{
    private String name;
    private String description;
    @OneToMany(mappedBy="boards")
    private Set<TaskList> taskLists;
}
