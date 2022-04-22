package com.avengers.todo.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class TaskList extends BaseEntity{
    private String title;

    @ManyToOne
    @JoinColumn(name="board_id", nullable=false)
    private Boards boards;

}
