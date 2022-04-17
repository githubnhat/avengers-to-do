package com.avengers.todo.repositories;

import com.avengers.todo.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsersRepository extends JpaRepository<Users, Long> {
    Users findByUsername(String username);

    Users findByUsernameAndIsActive(String username, boolean isActive);
}
