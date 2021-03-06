package com.avengers.todo.services;

import com.avengers.todo.entity.Comment;
import com.avengers.todo.entity.TaskList;
import com.avengers.todo.entity.Tasks;
import com.avengers.todo.payloads.*;
import com.avengers.todo.repositories.CommentRepository;
import com.avengers.todo.repositories.TaskListRepository;
import com.avengers.todo.repositories.TaskRepository;
import com.avengers.todo.repositories.UsersRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TaskService {
    private final TaskRepository taskRepository;
    private final TaskListRepository taskListRepository;
    private final CommentRepository commentRepository;

    private final UsersRepository usersRepository;

    public CreateTask create(CreateTask request) {
        TaskList taskList = taskListRepository.findById(request.getTaskListId()).orElse(null);
        if (taskList == null) {
            throw new IllegalStateException("TaskList Not Found");
        }
        Tasks tasks = taskRepository.save(Tasks.builder()
                .name(request.getName())
                .description(request.getDescription())
                .isDone(false)
                .active(true)
                .taskList(taskList).build());
        return CreateTask.builder().name(request.getName()).description(request.getName()).usersList(Collections.emptyList()).build();
    }


    public TaskResponse getTask(Long id) {
        Tasks task = taskRepository.findByIdAndActiveTrue(id).orElseThrow(() -> new IllegalArgumentException("Task not found"));
        List<Comment> comments = commentRepository.findCommentsByTaskId(id);
        return TaskResponse.builder()
                .id(task.getId())
                .name(task.getName())
                .description(task.getDescription())
                .isDone(task.getIsDone())
                .comments(comments.stream().map(e -> CommentResponse.builder()
                        .id(e.getId())
                        .content(e.getContent())
                        .fullName(usersRepository.findById(e.getUser().getId()).get().getFullName())
                        .createdDate(e.getCreatedDate())
                        .build()).collect(Collectors.toList()))
                .build();
    }


    public void updateTask(UpdateTaskRequest updateTaskRequest) {
        Long taskIdRequest = updateTaskRequest.getTaskId();
        String nameRequest = updateTaskRequest.getName();
        String descriptionRequest = updateTaskRequest.getDescription();
        Boolean isDoneRequest = updateTaskRequest.getIsDone();

        Tasks tasks = taskRepository.findById(taskIdRequest)
                .orElseThrow(() -> new IllegalArgumentException("Task is not exist"));

        if (nameRequest != null && nameRequest.length() > 0 && !Objects.equals(tasks.getName(), nameRequest)) {
            tasks.setName(nameRequest);
        }

        if (descriptionRequest != null && descriptionRequest.length() > 0 && !Objects.equals(tasks.getDescription(), descriptionRequest)) {
            tasks.setDescription(descriptionRequest);
        }

        if (isDoneRequest != null && !(isDoneRequest == tasks.getIsDone())) {
            tasks.setIsDone(isDoneRequest);
        }

        taskRepository.save(tasks);
    }

    public void delete(Long id) {
        Tasks tasks = taskRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Task not found"));

        if (tasks.isActive()) {
            tasks.setActive(false);
            taskRepository.save(tasks);
        } else {
            throw new IllegalArgumentException("Task is not exist");
        }
    }

    public void changeId(Long id, UpdateTaskListRequest request) {
        Tasks tasks = taskRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Task not found"));
        TaskList taskList = taskListRepository.findById(request.getTaskListId()).orElseThrow(() -> new IllegalArgumentException("TaskList not found"));
        tasks.setTaskList(taskList);
        taskRepository.save(tasks);
    }
}
