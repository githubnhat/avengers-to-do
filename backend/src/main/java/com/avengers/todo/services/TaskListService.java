package com.avengers.todo.services;

import com.avengers.todo.entity.Boards;
import com.avengers.todo.entity.TaskList;
import com.avengers.todo.entity.Tasks;
import com.avengers.todo.payloads.TaskListRequest;
import com.avengers.todo.payloads.TaskListResponse;
import com.avengers.todo.payloads.TaskResponse;
import com.avengers.todo.payloads.UpdateTaskListRequest;
import com.avengers.todo.repositories.BoardRepository;
import com.avengers.todo.repositories.TaskListRepository;
import com.avengers.todo.repositories.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TaskListService {
    private final BoardRepository boardRepository;
    private final TaskListRepository taskListRepository;

    private final TaskRepository taskRepository;

    public TaskList createTaskList(TaskListRequest request) {
        Boards board = boardRepository.findById(request.getBoardsId()).orElse(null);
        if (board == null) {
            throw new IllegalArgumentException("Board not found");
        }

        TaskList entity = TaskList.builder()
                .title(request.getTitle())
                .active(true)
                .boards(board).build();
        return taskListRepository.save(entity);
    }

    public List<TaskListResponse> getAllTaskList(Long boardsId){
        boolean exits = boardRepository.existsById(boardsId);
        if(!exits){
            throw new IllegalArgumentException("Board is not exits");
        }

        List<TaskList> taskList = taskListRepository.getAllTaskListByBoardId(boardsId);
        List<TaskListResponse> taskListReponses = new ArrayList<>();

        for(TaskList t : taskList){
            List<Tasks> tasks = taskRepository.getAllTaskByTaskListId(t.getId());
            List<TaskResponse> taskReponses = tasks.stream().map(e -> TaskResponse.builder()
                    .id(e.getId()).name(e.getName()).description(e.getDescription())
                    .isDone(e.getIsDone())
                    .deadline(e.getDeadline())
                    .build()).collect(Collectors.toList());


            taskListReponses.add(TaskListResponse.builder()
                    .id(t.getId())
                    .title(t.getTitle())
                    .listTask(taskReponses).build());

        }

        return taskListReponses;
    }


    public void deleteTaskList(Long taskListID) {
        TaskList taskList = taskListRepository.findById(taskListID)
                .orElseThrow(() ->  new IllegalArgumentException("Task list is not exist"));

        if(taskList.getActive()){
            taskList.setActive(false);
            taskListRepository.save(taskList);
        }else {
            throw new IllegalArgumentException("Task list is not exist");
        }
    }

    public void updateTaskList(UpdateTaskListRequest updateTaskListRequest) {
        String titleRequest = updateTaskListRequest.getTitle();
        TaskList taskList = taskListRepository.findById(updateTaskListRequest.getTaskListId())
                .orElseThrow(() ->  new IllegalArgumentException("Task list is not exist"));

        if(titleRequest != null && titleRequest.length() > 0 && !Objects.equals(taskList.getTitle(), titleRequest)){
            taskList.setTitle(titleRequest);
        }

        taskListRepository.save(taskList);
    }
}
