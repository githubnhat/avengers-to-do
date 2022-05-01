package com.avengers.todo.repositories;

import com.avengers.todo.entity.Tasks;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.scheduling.config.Task;

import java.util.List;
import java.util.Optional;

public interface TaskRepository extends JpaRepository<Tasks, Long> {

    @Query(value = "select * from tasks t where t.task_list_id = :id AND t.active = true", nativeQuery = true)
    List<Tasks> getAllTaskByTaskListId(@Param("id") Long taskListId);

    Optional<Tasks> findByIdAndActiveTrue (Long id);
}
