package com.avengers.todo.services;

import com.avengers.todo.entity.Comment;
import com.avengers.todo.entity.TaskList;
import com.avengers.todo.entity.Tasks;
import com.avengers.todo.entity.Users;
import com.avengers.todo.payloads.*;
import com.avengers.todo.repositories.CommentRepository;
import com.avengers.todo.repositories.TaskListRepository;
import com.avengers.todo.repositories.TaskRepository;
import com.avengers.todo.repositories.UsersRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.format.datetime.standard.DateTimeFormatterRegistrar;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TaskService {
    private final TaskRepository taskRepository;
    private final TaskListRepository taskListRepository;
    private final CommentRepository commentRepository;

    private final UsersRepository usersRepository;

    public TaskResponse create(CreateTask request) {
        TaskList taskList = taskListRepository.findById(request.getTaskListId()).orElse(null);
        List<Users> listUser = new ArrayList<>();
        if (request.getUsersList() != null) {
            request.getUsersList().forEach(
                    (user) -> {
                        listUser.add(usersRepository.findByUsername(user.getUsername()));
                    });
        }
        if (taskList == null) {
            throw new IllegalStateException("TaskList Not Found");
        }

        Tasks tasks = taskRepository.save(Tasks.builder()
                .name(request.getName())
                .description(request.getDescription())
                .isDone(false)
                .active(true)
                .users(listUser)
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

    public List<DeadlineResponse> getDeadlineList(int boardID) {
        String username = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        List<Tasks> tasks = taskRepository.getDeadlineList( boardID, username);
        List<DeadlineResponse> deadlineList=new ArrayList<>();
        tasks.forEach((task)->{
            DeadlineResponse deadline=new DeadlineResponse();
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
