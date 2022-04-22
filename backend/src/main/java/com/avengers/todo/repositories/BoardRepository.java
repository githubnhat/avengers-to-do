package com.avengers.todo.repositories;

import com.avengers.todo.entity.Boards;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardRepository extends JpaRepository<Boards, Long> {
    Boards findByName(String name);
}
