package com.avengers.todo.repositories;

import com.avengers.todo.entity.Tasks;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Tasks, Long> {

}
