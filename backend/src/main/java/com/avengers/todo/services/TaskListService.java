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
        Boards boards = boardRepository.findById(request.getBoardsId()).orElse(null);

        if(boards == null){
            throw new IllegalStateException("Board not found");
        }


        return taskListRepository.save(TaskList.builder()
                .title(request.getTitle())
                .boards(boards).build()
        );
    }
}
