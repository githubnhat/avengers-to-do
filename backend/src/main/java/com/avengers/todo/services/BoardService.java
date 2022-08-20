package com.avengers.todo.services;

import com.avengers.todo.common.Constant;
import com.avengers.todo.entity.*;
import com.avengers.todo.payloads.GetBoardIdResponse;
import com.avengers.todo.payloads.HandleBoard;
import com.avengers.todo.payloads.UsersInBoardResponse;
import com.avengers.todo.repositories.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.config.Task;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class BoardService {

    private final BoardRepository boardRepository;
    private final BoardUserRepository boardUserRepository;
    private final UsersRepository usersRepository;
    private final TaskListRepository taskListRepository;

    private final TaskRepository taskRepository;

    public Boards create(HandleBoard request) {
        Boards entity = Boards.builder().name(request.getName()).description(request.getDescription()).active(true).build();
        return boardRepository.save(entity);
    }

    public List<GetBoardIdResponse> getAll(Pageable pageable) {
        String username = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        List<Boards> listBoard = boardRepository.findMyBoards(username, true, Constant.APPROVED_INVITATION,pageable);
        List<GetBoardIdResponse> responses = new ArrayList<>();
        listBoard.forEach(e -> {
            List<TaskList> taskLists = taskListRepository.getAllTaskListByBoardId(e.getId());
            if (!taskLists.isEmpty()){
                int qtnTask= 0;
                int qtnTaskDone = 0;
                for(TaskList t : taskLists){
                    qtnTaskDone +=  taskRepository.getAllTaskByTaskListIdAndDone(t.getId(), true).size();
                    qtnTask += taskRepository.getAllTaskByTaskListId(t.getId()).size();
                }
                double percentDone =  Math.ceil((((double) qtnTaskDone * 100) / qtnTask) * 100) / 100;

                responses.add(GetBoardIdResponse.builder()
                        .id(e.getId())
                        .name(e.getName())
                        .description(e.getDescription())
                        .createdBy(e.getCreatedBy())
                        .createdDate(e.getCreatedDate())
                        .percentDone(percentDone)
                        .build());
            } else {
                responses.add(GetBoardIdResponse.builder()
                        .id(e.getId())
                        .name(e.getName())
                        .description(e.getDescription())
                        .createdBy(e.getCreatedBy())
                        .createdDate(e.getCreatedDate())
                        .percentDone(0.0)
                        .build());
            }
        });
        return responses;
    }

    public GetBoardIdResponse getById(Long id) {
        Boards boards = boardRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Boards not found"));
        List<TaskList> taskLists = taskListRepository.getAllTaskListByBoardId(id);
        int qtnTask= 0;
        int qtnTaskDone = 0;

        for(TaskList t : taskLists){
            qtnTaskDone +=  taskRepository.getAllTaskByTaskListIdAndDone(t.getId(), true).size();
            qtnTask += taskRepository.getAllTaskByTaskListId(t.getId()).size();
        }

        double percentDone =  Math.ceil((((double) qtnTaskDone * 100) / qtnTask) * 100) / 100;

        return GetBoardIdResponse.builder()
                .id(boards.getId())
                .name(boards.getName())
                .description(boards.getDescription())
                .createdBy(boards.getCreatedBy())
                .percentDone(percentDone)
                .build();
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
        Boards board = boardRepository.findByIdAndActiveTrue(boardId).orElseThrow(() -> new IllegalStateException("Board not found"));
        List<UsersInBoardResponse> result = boardUserRepository.findByBoardsIdAndStatusIn(boardId, List.of(Constant.APPROVED_INVITATION, Constant.PENDING_INVITATION))
                .stream().map(e -> UsersInBoardResponse.builder()
                        .invitationId(e.getId())
                        .joinDate(Constant.APPROVED_INVITATION.equals(e.getStatus()) ? e.getModifiedDate() : null )
                        .inviteDate(e.getCreatedDate())
                        .fullName(e.getUsers().getFullName())
                        .status(e.getStatus())
                        .build()).collect(Collectors.toList());
        result.add(UsersInBoardResponse.builder()
                .invitationId(null)
                .joinDate(board.getCreatedDate())
                .inviteDate(board.getCreatedDate())
                .fullName(usersRepository.findByUsername(board.getCreatedBy()).getFullName())
                .status("OWNER")
                .build());
        return result;
    }

    public int totalItem() {
        String username = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
//        return boardUserRepository.countByUsersUsernameAndBoardsActiveTrueAndStatus(username, Constant.APPROVED_INVITATION);
       int totalItem = (int) boardRepository.countMyBoard(username, true, Constant.APPROVED_INVITATION);
        return totalItem;
    }
}
