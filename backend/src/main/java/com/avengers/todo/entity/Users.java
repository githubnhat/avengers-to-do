package com.avengers.todo.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;

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
}
