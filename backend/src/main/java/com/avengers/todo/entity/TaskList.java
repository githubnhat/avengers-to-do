package com.avengers.todo.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class TaskList extends BaseEntity {
    private String title;
    @ManyToOne
    @JoinColumn(name="board_id", nullable=false)
    @JsonIgnore
    private Boards boards;
    @OneToMany(mappedBy = "taskList")
    private List<Tasks> tasks;

    private Boolean active;
}
