package com.avengers.todo.repositories;

import com.avengers.todo.entity.Boards;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BoardRepository extends JpaRepository<Boards, Long> {
    @Query(value = "select b.* " +
            "from boards b " +
            "left join boards_users bu on b.id=bu.board_id " +
            "where (b.created_by =:username OR bu.user_id IN(select id from users where username =:username))AND b.active =:active"
            , nativeQuery = true)
    List<Boards> findMyBoards(@Param("username") String username, @Param("active") boolean active);
}
