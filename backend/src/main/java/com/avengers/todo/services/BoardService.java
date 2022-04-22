package com.avengers.todo.services;

import com.avengers.todo.entity.Boards;
import com.avengers.todo.payloads.CreateBoardRequest;
import com.avengers.todo.repositories.BoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
//@RequiredArgsConstructor
public class BoardService {

    @Autowired
    private BoardRepository boardRepository;

    public Boards createNewBoard(CreateBoardRequest request) {
        System.out.println(boardRepository);
        if (boardRepository.findByName(request.getName()) != null) {
            throw new IllegalArgumentException("Board already exists");
        }
        Boards entity = Boards.builder().name(request.getName()).description(request.getDescription()).build();
        return boardRepository.save(entity);
    }
    public List<Boards> getAll (){
        return boardRepository.findAll();
    }
}
