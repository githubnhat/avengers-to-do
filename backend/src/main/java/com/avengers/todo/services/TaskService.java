package com.avengers.todo.services;

import com.avengers.todo.entity.Tasks;
import com.avengers.todo.entity.TaskList;
import com.avengers.todo.payloads.CreateTask;
import com.avengers.todo.repositories.TaskRepository;
import com.avengers.todo.repositories.TaskListRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
@RequiredArgsConstructor
public class TaskService {
    private final TaskRepository taskRepository;
    private final TaskListRepository taskListRepository;

    public CreateTask create(CreateTask request) {
        TaskList taskList = taskListRepository.findById(request.getTaskListId()).orElse(null);
        if (taskList == null) {
            throw new IllegalStateException("TaskList Not Found");
        }
        Tasks tasks = taskRepository.save(Tasks.builder().name(request.getName()).description(request.getDescription()).taskList(taskList).build());
        return CreateTask.builder().name(request.getName()).description(request.getName()).usersList(Collections.emptyList()).build();
    }
}
