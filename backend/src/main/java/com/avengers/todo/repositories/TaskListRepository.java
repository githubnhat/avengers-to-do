package com.avengers.todo.repositories;

import com.avengers.todo.entity.TaskList;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskListRepository extends JpaRepository<TaskList, Long> {

}
