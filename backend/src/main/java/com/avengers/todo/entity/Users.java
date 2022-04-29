package com.avengers.todo.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Users extends BaseEntity {
    private String username;
    private String password;
    private String fullName;
    private boolean isActive;
    @ManyToMany(mappedBy = "users")
    private List<Boards> boards;
    @ManyToMany(mappedBy = "users")
    private List<Tasks> tasks;

    @OneToMany(mappedBy = "user")
    private List<Comment> comments;
}
