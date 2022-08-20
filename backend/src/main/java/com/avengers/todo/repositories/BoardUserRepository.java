package com.avengers.todo.repositories;

import com.avengers.todo.entity.BoardsUsers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Collection;
import java.util.List;

public interface BoardUserRepository extends JpaRepository<BoardsUsers, Long> {
    @Query(value = "select bu.* from boards_users bu where bu.board_id = :boardId and bu.status in :statusList", nativeQuery = true)
    List<BoardsUsers> findByBoardsIdAndStatusIn(@Param("boardId") Long id, @Param("statusList") Collection<String> status);
    List<BoardsUsers> findByUsersUsernameAndBoardsActiveTrueAndStatusIn(String username, Collection<String> status);

    int countByUsersUsernameAndBoardsActiveTrueAndStatus(String username, String approvedInvitation);
}
