package com.avengers.todo.services;

import com.avengers.todo.entity.Comment;
import com.avengers.todo.entity.Tasks;
import com.avengers.todo.entity.Users;
import com.avengers.todo.payloads.CommentRequest;
import com.avengers.todo.repositories.CommentRepository;
import com.avengers.todo.repositories.TaskRepository;
import com.avengers.todo.repositories.UsersRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;
    private final TaskRepository taskRepository;
    private final UsersRepository usersRepository;

    public Comment create(CommentRequest request) {
        Tasks task = taskRepository.findById(request.getTaskId()).orElseThrow(() -> new IllegalStateException("Task not found"));
        String username = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        Users appUser = usersRepository.findByUsernameAndIsActive(username, true);
        if (appUser == null) {
            throw new IllegalArgumentException("Current user not found");
        }
        return commentRepository.save(new Comment(request.getContent(), appUser, task));
    }
}
