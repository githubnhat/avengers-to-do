package com.avengers.todo.services;

import com.avengers.todo.common.Constant;
import com.avengers.todo.entity.Boards;
import com.avengers.todo.payloads.GetBoardIdResponse;
import com.avengers.todo.payloads.HandleBoard;
import com.avengers.todo.payloads.UsersInBoardResponse;
import com.avengers.todo.repositories.BoardRepository;
import com.avengers.todo.repositories.BoardUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class BoardService {

    private final BoardRepository boardRepository;
    private final BoardUserRepository boardUserRepository;

    public Boards create(HandleBoard request) {
        Boards entity = Boards.builder().name(request.getName()).description(request.getDescription()).active(true).build();
        return boardRepository.save(entity);
    }

    public List<Boards> getAll() {
        String username = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        return boardRepository.findMyBoards(username, true, Constant.APPROVED_INVITATION);
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
        Boards boards = boardRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Boards not found"));
        if (boards.isActive()) {
            boards.setActive(false);
            boardRepository.save(boards);
        } else {
            throw new IllegalArgumentException("Board is not exist");
        }
    }

    public List<UsersInBoardResponse> getUsersInBoard(Long boardId) {
        boardRepository.findByIdAndActiveTrue(boardId).orElseThrow(() -> new IllegalStateException("Board not found"));
        return boardUserRepository.findByBoardsIdAndStatusIn(boardId, List.of(Constant.APPROVED_INVITATION, Constant.PENDING_INVITATION))
                .stream().map(e -> UsersInBoardResponse.builder()
                        .invitationId(e.getId())
                        .joinDate(Constant.APPROVED_INVITATION.equals(e.getStatus()) ? e.getModifiedDate() : null )
                        .inviteDate(e.getCreatedDate())
                        .fullName(e.getUsers().getFullName())
                        .status(e.getStatus())
                        .build()).collect(Collectors.toList());
    }
}
