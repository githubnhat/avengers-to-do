package com.avengers.todo.repositories;

import com.avengers.todo.entity.Tasks;
import com.avengers.todo.payloads.DeadlineResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface TaskRepository extends JpaRepository<Tasks, Long> {

    @Query(value = "select * from tasks t where t.task_list_id = :id AND t.active = true", nativeQuery = true)
    List<Tasks> getAllTaskByTaskListId(@Param("id") Long taskListId);


    Optional<Tasks> findByIdAndActiveTrue (Long id);

    @Query(value = "select * from tasks t where t.task_list_id = :id AND t.active = true AND t.is_done = :isDone", nativeQuery = true)
    List<Tasks> getAllTaskByTaskListIdAndDone(@Param("id") Long taskListId, @Param("isDone") Boolean isDone);


    @Query(value = "select tasks.* from task_list tl inner join tasks on tl.id = tasks.task_list_id inner join tasks_users tu on tasks.id = tu.task_id inner join users on tu.user_id=users.id where tasks.active=true and tl.active=true and tl.board_id= :boardID and users.username= :username", nativeQuery = true)
    List<Tasks> getDeadlineList(@Param("boardID") int boardID,@Param("username") String username);

}
