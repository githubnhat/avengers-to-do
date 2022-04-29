package com.avengers.todo.repositories;

import com.avengers.todo.entity.TaskList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TaskListRepository extends JpaRepository<TaskList, Long> {

    @Query(value = "select t.* from  task_list t join boards b on t.board_id =  b.id where b.id = :boardsId ", nativeQuery = true)
    List<TaskList> getAllTaskListByBoardId(@Param("boardsId") Long boardsId);
}
