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

    Optional<Tasks> findByIdAndActiveTrue(Long id);

    @Query(value = "select new com.avengers.todo.payloads.DeadlineResponse(tl.board_id, users.username, tl.title, tasks.task_list_id, tasks.description, tasks.name as task_name,  tasks.deadline, tasks.is_done ) from task_list tl inner join tasks on tl.id = tasks.task_list_id inner join tasks_users tu on tasks.id = tu.user_id inner join users on tu.user_id=users.id where tasks.active=true and tl.active=true and tl.board_id=:boardID and users.username=:username and DATE_PART('month', tasks.deadline)=:month and DATE_PART('year', tasks.dealine)=:year ", nativeQuery = true)
    List<DeadlineResponse> getDeadlineList(@Param("month") int month,@Param("year") int year,@Param("boardID") long boardID,@Param("username") String username);
}
