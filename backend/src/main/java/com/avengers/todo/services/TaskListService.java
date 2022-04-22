package com.avengers.todo.services;

import com.avengers.todo.entity.Boards;
import com.avengers.todo.entity.TaskList;
import com.avengers.todo.payloads.TaskListRequest;
import com.avengers.todo.repositories.BoardRepository;
import com.avengers.todo.repositories.TaskListRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TaskListService {
    private final BoardRepository boardRepository;
    private final TaskListRepository taskListRepository;

    public TaskList createTaskList(TaskListRequest request) {
        Boards board = boardRepository.findById(request.getBoardsId()).orElse(null);

        if (board == null) {
            throw new IllegalStateException("Board not found");
        }

        TaskList entity = TaskList.builder()
                .title(request.getTitle())
                .boards(board).build();
        return taskListRepository.save(entity);
    }
}
