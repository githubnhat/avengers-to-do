package com.avengers.todo.services;

import com.avengers.todo.common.Constant;
import com.avengers.todo.entity.BoardsUsers;
import com.avengers.todo.entity.Boards;
import com.avengers.todo.entity.Users;
import com.avengers.todo.payloads.InvitationRequest;
import com.avengers.todo.payloads.InvitationResponse;
import com.avengers.todo.payloads.UpdateInvitationRequest;
import com.avengers.todo.payloads.UserInvitationResponse;
import com.avengers.todo.repositories.BoardRepository;
import com.avengers.todo.repositories.BoardUserRepository;
import com.avengers.todo.repositories.UsersRepository;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class InvitationService {

    private final BoardRepository boardRepository;
    private final BoardUserRepository boardUserRepository;
    private final UsersRepository usersRepository;

    public List<UserInvitationResponse> getUsersCanInvite(Long boardId) {
        Boards board = boardRepository.findByIdAndActiveTrue(boardId).orElseThrow(() -> new IllegalStateException("Board not found"));
        String username = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        List<String> userNamesInBoard = boardUserRepository.findByBoardsIdAndStatusIn(boardId, List.of(Constant.APPROVED_INVITATION, Constant.PENDING_INVITATION))
                .stream().map(e -> e.getUsers().getUsername()).collect(Collectors.toList());
        List<Users> allUsers = usersRepository.findByIsActiveTrue();
        return allUsers.stream()
                .filter(e -> !userNamesInBoard.contains(e.getUsername())
                        && !StringUtils.equals(board.getCreatedBy(), e.getUsername())
                        && !StringUtils.equals(username, e.getUsername()))
                .map(e -> UserInvitationResponse.builder()
                        .id(e.getId())
                        .username(e.getUsername())
                        .fullName(e.getFullName())
                        .build())
                .collect(Collectors.toList());
    }

    @Transactional
    public void addUsersToBoard(InvitationRequest invitationRequest) {
        Boards board = boardRepository.findByIdAndActiveTrue(invitationRequest.getBoardId()).orElseThrow(() -> new IllegalStateException("Board not found"));
        String username = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        if (!StringUtils.equals(username, board.getCreatedBy())) {
            throw new IllegalStateException("Sorry, only the board owner can add members");
        }

        List<Long> usersIdInBoard = boardUserRepository.findByBoardsIdAndStatusIn(invitationRequest.getBoardId(), List.of(Constant.APPROVED_INVITATION, Constant.PENDING_INVITATION))
                .stream().map(e -> e.getUsers().getId()).collect(Collectors.toList());
        usersIdInBoard.add(usersRepository.findByUsername(username).getId());
        List<Long> newUsersId = invitationRequest.getUsersId().stream().filter(id -> !usersIdInBoard.contains(id)).collect(Collectors.toList());
        newUsersId.forEach(id -> boardUserRepository.save(BoardsUsers.builder()
                .users(usersRepository.findById(id).orElseThrow(() -> new IllegalStateException("User with ID " + id + " not found")))
                .boards(board)
                .status(Constant.PENDING_INVITATION)
                .build()));
    }

    public List<InvitationResponse> getInvitation() {
        String username = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        return boardUserRepository.findByUsersUsernameAndBoardsActiveTrueAndStatusIn(username, List.of(Constant.PENDING_INVITATION))
                .stream().map(e -> InvitationResponse.builder()
                        .invitationId(e.getId())
                        .inviter(usersRepository.findByUsername(e.getCreatedBy()).getFullName())
                        .invitationTime(e.getCreatedDate())
                        .status(e.getStatus())
                        .boardName(e.getBoards().getName())
                        .build())
                .collect(Collectors.toList());
    }

    public void updateInvitation(UpdateInvitationRequest request) {
        BoardsUsers invitation = boardUserRepository.findById(request.getInvitationId()).orElseThrow(() -> new IllegalStateException("Invitation invalid"));
        if (StringUtils.isEmpty(request.getStatus())
                || isNotValidInvitationStatus(invitation.getStatus(), request.getStatus())) {
            throw new IllegalStateException("Invitation status invalid");
        }
        invitation.setStatus(request.getStatus());
        boardUserRepository.save(invitation);
    }

    private boolean isValidInvitationStatus(String currentStatus, String newStatus) {
        return Constant.PENDING_INVITATION.equals(currentStatus) && (Constant.APPROVED_INVITATION.equals(newStatus) || Constant.REJECTED_INVITATION.equals(newStatus));
    }

    private boolean isNotValidInvitationStatus(String currentStatus, String newStatus) {
        return !isValidInvitationStatus(currentStatus, newStatus);
    }

    public void deleteInvitation(Long id) {
        BoardsUsers invitation = boardUserRepository.findById(id).orElseThrow(() -> new IllegalStateException("Invitation invalid"));
        invitation.setStatus(Constant.DELETED_INVITATION);
        boardUserRepository.save(invitation);
    }
}