package com.avengers.todo.services;

import com.avengers.todo.entity.Comment;
import com.avengers.todo.entity.Tasks;
import com.avengers.todo.entity.Users;
import com.avengers.todo.payloads.CommentRequest;
import com.avengers.todo.payloads.CommentResponse;
import com.avengers.todo.repositories.CommentRepository;
import com.avengers.todo.repositories.TaskRepository;
import com.avengers.todo.repositories.UsersRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;
    private final TaskRepository taskRepository;
    private final UsersRepository usersRepository;

    public Comment create(CommentRequest request) {
        Optional<Users> user = usersRepository.findById(request.getUser_id());
        Optional<Tasks> tasks = taskRepository.findById(request.getTask_id());
        if (!(user.isPresent()&&tasks.isPresent())) {
            throw new IllegalArgumentException("User or Task is not found!");
        }
        return commentRepository.save(new Comment(request.getContent(),user.get(),tasks.get()));
    }
}
