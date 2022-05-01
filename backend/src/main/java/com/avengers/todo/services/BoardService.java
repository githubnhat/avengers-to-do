package com.avengers.todo.services;

import com.avengers.todo.entity.Boards;
import com.avengers.todo.payloads.HandleBoard;
import com.avengers.todo.payloads.GetBoardIdResponse;
import com.avengers.todo.repositories.BoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@RequiredArgsConstructor
public class BoardService {

    private final BoardRepository boardRepository;

    public Boards create(HandleBoard request) {
        Boards entity = Boards.builder().name(request.getName()).description(request.getDescription()).build();
        return boardRepository.save(entity);
    }

    public List<Boards> getAll() {
        String username = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        return boardRepository.findMyBoards(username);
    }

    public GetBoardIdResponse getById(Long id) {
        Boards boards = boardRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Boards not found"));
        return GetBoardIdResponse.builder().id(boards.getId()).name(boards.getName()).descriptiom(boards.getDescription()).createdBy(boards.getCreatedBy()).build();
    }

    public HandleBoard update(HandleBoard request, Long id) {
        Boards boards = boardRepository.findById(id).map(board -> {
            board.setName(request.getName());
            board.setDescription(request.getDescription());
            return boardRepository.save(board);
        }).orElseThrow(() -> new IllegalArgumentException("Boards not found"));
        return HandleBoard.builder().description(request.getDescription()).name(request.getName()).build();
    }

    public void delete(Long id) {
        boardRepository.deleteById(id);
    }
}
