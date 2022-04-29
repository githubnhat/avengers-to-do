package com.avengers.todo.repositories;

import com.avengers.todo.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    @Query(value = "select c.* from comment c where tasks_id = :taskId", nativeQuery = true)
    List<Comment> findCommentsByTaskId(@Param("taskId") Long taskId);
}
