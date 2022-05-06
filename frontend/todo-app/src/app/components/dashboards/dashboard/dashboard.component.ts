import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { Message, Task, TaskList } from 'src/app/interface';
import { DashboardService } from '../service/dashboard.service';
import { Guid } from 'guid-typescript';
import { TaskListService } from '../service/task-list.service';
import { HandleMessageService } from 'src/app/services/handle-message.service';
import { TaskService } from '../service/task.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  taskId!: any;
  nameTask: string = '';
  displayDetailTask: boolean = false;
  private subscription: Subscription[] = [];
  private draggedTask?: Task;
  private selectedTaskListId: string = '';
  private newTaskMapping: string[] = [];

  public dashboardId: string = '';
  public isDisabledSubmitNewTask: boolean = false;
  public isCreateNewTask = false;
  public createListForm!: FormGroup;
  public editTaskListForm!: FormGroup;
  public displayCreateNewListDialog: boolean = false;
  public displayEditTaskList: boolean = false;
  public displayTeamMembers: boolean = false;

  taskLists: TaskList[] = [];
  item!: Task;
  listTask: Task[] = [];

  taskName: String = '';

  taskList: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private taskListService: TaskListService,
    private handleMessageService: HandleMessageService,
    private taskService: TaskService,
    private form: FormBuilder
  ) {}

  ngOnInit(): void {
    this.fetchUrlData();
  }

  fetchTasks(): void {
    this.subscription.push(
      this.taskListService
        .getAllTaskList(this.dashboardId)
        .subscribe((data) => {
          console.log(data);
          this.taskLists = data;
        })
    );
  }

  showTeamMember(): void {
    this.displayTeamMembers = true;
  }

  onCloseTeamMembersDialog(event: boolean) {
    this.displayTeamMembers = false;
  }

  newTaskList(): void {
    this.displayCreateNewListDialog = true;
    this.createListForm = this.form.group({
      name: ['', [Validators.required]],
    });
  }

  dragStartHandler(task: Task): void {
    this.draggedTask = task;
  }

  dragEndHandler(): void {
    this.draggedTask = undefined;
  }

  dropHandler(event: Event, taskList: TaskList): void {
    if (
      this.draggedTask &&
      !taskList.listTask.some((_task) => _task.id === this.draggedTask?.id)
    ) {
      this.taskLists.forEach((_list) => {
        if (_list.id !== taskList.id) {
          _list.listTask = _list.listTask.filter(
            (_task: { id: string | undefined }) => {
              return _task.id !== this.draggedTask?.id;
            }
          );
        }
      });

      taskList.listTask = [...taskList.listTask, this.draggedTask];
    }
  }
  onCreateNewList(): void {
    let body = {
      title: this.createListForm.value.name,
      boardsId: this.dashboardId,
    };
    this.taskLists.push({
      id: Guid.create().toString(),
      listTask: [],
      title: this.createListForm.value.name,
    });
    this.taskListService.createTaskList(body).subscribe((data) => {});
    this.displayCreateNewListDialog = false;
  }

  fetchUrlData(): void {
    this.subscription.push(
      this.activatedRoute.paramMap
        .pipe(
          switchMap((paramMap, index) => {
            this.dashboardId = paramMap.get('dashboardId') + '';
            return this.taskListService.getAllTaskList(this.dashboardId);
          })
        )
        .subscribe(
          (_respone) => {
            console.log(_respone);
            this.taskLists = _respone;
          },
          (error) => {
            console.log();
          }
        )
    );
  }

  addNewTask(taskList: TaskList): void {
    this.isCreateNewTask = true;
    taskList.listTask.push({
      description: '',
      id: 'newtask',
      name: '',
      isDone: false,
    });
  }

  editTaskList(taskList: TaskList): void {
    this.selectedTaskListId = taskList.id;
    console.log(taskList);
    this.displayEditTaskList = true;
    this.editTaskListForm = this.form.group({
      title: [taskList.title, [Validators.required]],
    });
  }
  onSubmitEditTaskList(): void {
    this.displayEditTaskList = false;
    let body: any = {
      taskListId: this.selectedTaskListId,
      title: this.editTaskListForm.value.title,
    };
    this.taskListService.updateTaskList(body).then((_x) => {
      let message: Message = {
        detail: 'Updated successfully',
        key: 'toast',
        severity: 'success',
        summary: 'Success',
      };
      this.fetchUrlData();
      this.handleMessageService.setMessage(message);
    });
  }

  doneTask(task: Task, taskList: TaskList): void {
    const body = {
      taskId: task.id,
      isDone: !task.isDone,
    };
    let message: Message = {
      detail: 'Updated successfully',
      key: 'toast',
      severity: 'success',
      summary: 'Success',
    };
    this.taskService.doneTask(body).then(() => {
      task.isDone = body.isDone;
      this.handleMessageService.setMessage(message);
    });
  }

  submitNewTask(id: any): void {
    let body = {
      taskListId: id,
      name: this.taskName,
      description: '',
    };
    this.taskListService.createTask(body).subscribe((data) => {
      this.fetchTasks();
    });
  }
  cancelNewTask(taskList: TaskList): void {
    this.isCreateNewTask = false;
    taskList.listTask = taskList.listTask.filter(
      (_task) => _task.id !== 'newtask'
    );
  }

  deleteTask(task: Task, tasklist: TaskList) {
    tasklist.listTask = tasklist.listTask.filter((_x) => {
      return _x.id !== task.id;
    });
    if (this.newTaskMapping.some((_id) => _id !== task.id)) {
    }
  }

  showDetailTask(id: string) {
    this.taskId = id;
    this.displayDetailTask = true;


  }
  closeDetailTask(event:any) {
    this.displayDetailTask = event;
  }
  ngOnDestroy(): void {
    this.subscription.forEach((_scription) => {
      _scription.unsubscribe();
    });
  }
}
