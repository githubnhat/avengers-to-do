package com.avengers.todo.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import java.util.Set;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Boards extends BaseEntity {
    private String name;

    private String description;

    @JsonIgnore
    @OneToMany(mappedBy = "boards")
    private Set<TaskList> taskLists;

    @JsonIgnore
    @OneToMany(mappedBy = "boards")
    private List<BoardsUsers> boardsUsers;

    private boolean active;
}
