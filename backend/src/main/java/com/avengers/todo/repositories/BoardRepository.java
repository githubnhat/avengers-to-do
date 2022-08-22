package com.avengers.todo.repositories;

import com.avengers.todo.entity.Boards;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface BoardRepository extends JpaRepository<Boards, Long> {
    @Query(value = "select b.* " +
            "from boards b " +
            "left join boards_users bu on b.id = bu.board_id " +
            "where b.active =:active and " +
            "(b.created_by =:username or (bu.user_id in (select id from users where username =:username) and bu.status = :status)) ",
            nativeQuery = true)
    List<Boards> findMyBoards(@Param("username") String username, @Param("active") boolean active, @Param("status") String status, Pageable pageable);

    Optional<Boards> findByIdAndActiveTrue(Long id);

    @Query(value = "select count(b.*) " +
            "from boards b " +
            "left join boards_users bu on b.id = bu.board_id " +
            "where b.active =:active and " +
            "(b.created_by =:username or (bu.user_id in (select id from users where username =:username) and bu.status = :status))",
            nativeQuery = true)
    long countMyBoard(@Param("username") String username, @Param("active") boolean active, @Param("status") String status);

    @Query(value = "select b.* " +
            "from boards b " +
            "left join boards_users bu on b.id = bu.board_id " +
            "where b.active =:active and " +
            "(b.created_by =:username or (bu.user_id in (select id from users where username =:username) and bu.status = :status)) ",
            nativeQuery = true)
    List<Boards> findMyBoardsOrderByProgress(@Param("username") String username, @Param("active") boolean active, @Param("status") String status);
}
