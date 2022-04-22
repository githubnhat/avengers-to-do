package com.avengers.todo.repositories;

import com.avengers.todo.entity.Boards;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BoardRepository extends JpaRepository<Boards, Long> {
    List<Boards> findByCreatedBy(String userName);
}
