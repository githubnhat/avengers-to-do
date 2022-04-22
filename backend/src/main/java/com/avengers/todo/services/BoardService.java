package com.avengers.todo.services;

import com.avengers.todo.entity.Boards;
import com.avengers.todo.payloads.CreateBoardRequest;
import com.avengers.todo.repositories.BoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@RequiredArgsConstructor
public class BoardService {

    private final BoardRepository boardRepository;

    public Boards createNewBoard(CreateBoardRequest request) {
        Boards entity = Boards.builder().name(request.getName()).description(request.getDescription()).build();
        return boardRepository.save(entity);
    }
    public List<Boards> getAll (){
        String username = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        return boardRepository.findByCreatedBy(username);
    }
}
