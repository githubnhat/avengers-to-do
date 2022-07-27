package com.avengers.todo.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Tasks extends BaseEntity {
    private String name;

    private String description;

    @ManyToOne
    @JoinColumn(name = "task_list_id", nullable = false)
    private TaskList taskList;

    @ManyToMany
    @JoinTable(name = "tasks_users",
            joinColumns = @JoinColumn(name = "task_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id"))
    private List<Users> users;

    @OneToMany(mappedBy = "tasks")
    private List<Comment> comments;

    private Boolean isDone;

    private boolean active;
    @JsonFormat(pattern="dd-MM-yyyy")
    private Date deadline;
}
