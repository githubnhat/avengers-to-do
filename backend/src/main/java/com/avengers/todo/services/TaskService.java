package com.avengers.todo.services;

import com.avengers.todo.entity.*;
import com.avengers.todo.payloads.*;
import com.avengers.todo.repositories.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TaskService {
    private final TaskRepository taskRepository;
    private final BoardRepository boardRepository;
    private final TaskListRepository taskListRepository;
    private final CommentRepository commentRepository;

    private final UsersRepository usersRepository;

    public TaskResponse create(CreateTask request) {
        TaskList taskList = taskListRepository.findById(request.getTaskListId()).orElse(null);

        if (taskList == null) {
            throw new IllegalStateException("TaskList Not Found");
        }

        Tasks tasks = taskRepository.save(Tasks.builder()
                .name(request.getName())
                .description(request.getDescription())
                .isDone(false)
                .active(true)
                .deadline(request.getDeadline())
                .taskList(taskList).build());
        return TaskResponse.builder()
                .id(tasks.getId())
                .name(tasks.getName())
                .description(tasks.getDescription())
                .taskListId(tasks.getTaskList().getId())
                .deadline(tasks.getDeadline())
                .build();
    }


    public TaskResponse getTask(Long id) {
        Tasks task = taskRepository.findByIdAndActiveTrue(id).orElseThrow(() -> new IllegalArgumentException("Task not found"));
        List<Comment> comments = commentRepository.findCommentsByTaskId(id);
        return TaskResponse.builder()
                .id(task.getId())
                .name(task.getName())
                .description(task.getDescription())
                .isDone(task.getIsDone())
                .deadline(task.getDeadline())
                .comments(comments.stream().map(e -> CommentResponse.builder()
                        .id(e.getId())
                        .content(e.getContent())
                        .fullName(usersRepository.findById(e.getUser().getId()).get().getFullName())
                        .createdDate(e.getCreatedDate())
                        .build()).collect(Collectors.toList()))
                .usersList(task.getUsers().stream().map(user -> UserResponse.builder()
                        .id(user.getId())
                        .userName(user.getUsername())
                        .fullName(user.getFullName())
                        .build()).collect(Collectors.toList()))
                .build();
    }


    public void updateTask(UpdateTaskRequest updateTaskRequest) {
        List<Users> users = new ArrayList<>();
        if (updateTaskRequest.getUsersList() != null) {
            updateTaskRequest.getUsersList().forEach(
                    (user) -> {
                        users.add(usersRepository.findByUsername(user.getUsername()));
                    });
        }
        Long taskIdRequest = updateTaskRequest.getTaskId();
        String nameRequest = updateTaskRequest.getName();
        String descriptionRequest = updateTaskRequest.getDescription();
        Boolean isDoneRequest = updateTaskRequest.getIsDone();
        Date deadlineRequest = updateTaskRequest.getDeadline();
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

        if (isDoneRequest != null && !(isDoneRequest == tasks.getIsDone())) {
            tasks.setIsDone(isDoneRequest);
        }
        if (deadlineRequest != null && !(deadlineRequest == tasks.getDeadline())) {
            tasks.setDeadline(deadlineRequest);
        }
        if (!(users == tasks.getUsers())) {
            tasks.setUsers(users);
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

    public List<DeadlineResponse> getDeadlineList(long boardID) {
        Boards boards = boardRepository.findById(boardID).orElseThrow(() -> new IllegalArgumentException("Boards not found"));
        String username = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        List<Tasks> tasks;
        if (boards.getCreatedBy().equals(username)) {
            tasks = taskRepository.getAllDeadlineList(boardID);
        } else {
            tasks = taskRepository.getDeadlineList(boardID, username);
        }
        return tasksToDeadlineResponses(tasks, boardID);
    }

    public List<DeadlineResponse> getDeadlineListByDate(String date, long boardID) {
        Boards boards = boardRepository.findById(boardID).orElseThrow(() -> new IllegalArgumentException("Boards not found"));
        String username = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        List<Tasks> tasks;
        if (boards.getCreatedBy().equals(username)) {
            tasks = taskRepository.getDeadlineListByDate(date, boardID);
        } else {
            tasks = taskRepository.getDeadlineListByDate(date, boardID, username);
        }
        return tasksToDeadlineResponses(tasks, boardID);
    }

    public List<DeadlineResponse> tasksToDeadlineResponses(List<Tasks> tasks, long boardID) {
        List<DeadlineResponse> deadlineList = new ArrayList<>();
        tasks.forEach((task) -> {
            DeadlineResponse deadline = new DeadlineResponse();
            deadline.setBoardId(boardID);
            deadline.setTaskID(task.getId());
            deadline.setTitle(task.getTaskList().getTitle());
            deadline.setTaskListId(task.getTaskList().getId());
            deadline.setTaskName(task.getName());
            deadline.setDescription(task.getDescription());
            deadline.setDeadline(task.getDeadline());
            deadline.setDone(task.getIsDone());
            deadlineList.add(deadline);
        });
        return deadlineList;
    }
}