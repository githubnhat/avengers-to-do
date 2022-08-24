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
import { formatDate } from '@angular/common';
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
  private selectedTaskListId?: number;
  private newTaskMapping: string[] = [];

  public dashboardId: string = '';
  public isDisabledSubmitNewTask: boolean = false;
  public isCreateNewTask = false;
  public createListForm!: FormGroup;
  public editTaskListForm!: FormGroup;
  public displayCreateNewListDialog: boolean = false;
  public displayEditTaskList: boolean = false;
  public displayTeamMembers: boolean = false;
  public approvedMembers: any[] = []

  taskLists: TaskList[] = [];
  item!: Task;
  listTask: Task[] = [];

  taskName: String = '';

  taskList: any;

  workboardName: String = '';
  percentDone: String = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private taskListService: TaskListService,
    private handleMessageService: HandleMessageService,
    private taskService: TaskService,

    private form: FormBuilder,
    private dashboardService: DashboardService
  ) { }

  ngOnInit(): void {
    this.fetchUrlData();
    this.fecthWorkboardName();
    this.fetchMember();
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

  fetchMember() {
    this.subscription.push(
      this.dashboardService.getApprovedUserInBoard(this.dashboardId).subscribe(_x => {
        this.approvedMembers = _x;
      })
    )
  }


  dropHandler(event: Event, taskList: TaskList): void {
    const body = {
      taskListId: taskList.id,
    };
    if (
      this.draggedTask &&
      !taskList.listTask.some((_task) => _task.id === this.draggedTask?.id)
    ) {
      this.taskService
        .changeIdTaskList(parseInt(this.draggedTask!.id), body)
        .then(() => {
          this.fetchTasks();
        });
    }
  }

  onCreateNewList(): void {
    let body = {
      title: this.createListForm.value.name,
      boardsId: this.dashboardId,
    };

    this.taskListService.createTaskList(body).subscribe((data: any) => {
      this.taskLists.push({
        id: data.data.id,
        listTask: [],
        title: this.createListForm.value.name,
      });
    });

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
      deadline: '',
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
      this.fecthWorkboardName();
    });
  }

  submitNewTask(id: any): void {
    let body = {
      taskListId: id,
      name: this.taskName,
      description: '',
      deadline: formatDate(new Date(), 'yyyy-MM-dd', 'en-US', '+0700'),
    };
    this.taskListService.createTask(body).subscribe((data) => {
      this.fetchTasks();
      this.isCreateNewTask = false;
      this.taskName = '';
      this.fecthWorkboardName();
    });
  }
  cancelNewTask(taskList: TaskList): void {
    this.isCreateNewTask = false;
    taskList.listTask = taskList.listTask.filter(
      (_task) => _task.id !== 'newtask'
    );
  }

  deleteTaskList(taskList: TaskList): void {
    this.taskListService.deleteTaskList(taskList.id).then(() => {
      this.handleMessageService.setMessage({
        detail: 'Delete successfully',
        key: 'toast',
        severity: 'success',
        summary: 'Success',
      });
      this.fetchTasks();
    });
  }

  deleteTask(task: Task, tasklist: TaskList) {
    if (task.id !== 'newtask') {
      this.taskService.deleteTask(parseInt(task.id)).then(() => {
        this.handleMessageService.setMessage({
          detail: 'Delete successfully',
          key: 'toast',
          severity: 'success',
          summary: 'Success',
        });
        this.fetchTasks();
        this.fecthWorkboardName();
      });
    }
  }

  showDetailTask(id: string) {
    this.taskId = id;
    this.displayDetailTask = true;
  }
  closeDetailTask(event: any) {
    this.displayDetailTask = event;
  }
  ngOnDestroy(): void {
    this.subscription.forEach((_scription) => {
      _scription.unsubscribe();
    });
  }

  fecthWorkboardName() {
    this.dashboardService
      .getDashboardById(this.dashboardId)
      .subscribe((_data) => {
        this.workboardName = _data.name;
        this.percentDone = _data.percentDone + '';
        console.log(this.percentDone);
      });
  }

  //xử lý màu dealine
  taskDealine(time: string) {
    let now = formatDate(new Date(), 'yyyy-MM-dd', 'en-US', '+0700');
    let arraynow: any;
    let arraydealine: any;

    if (time === now) {
      return "dealine-yel";
    }

    if (time === null) {
      return "dealine-green";
    }

    if (time !== undefined) {
      arraynow = now.split('-');
      arraydealine = time.split('-');

      if (parseInt(arraydealine[0]) < parseInt(arraynow[0])) {
        return "dealine-red"
      }
      if (parseInt(arraydealine[0]) == parseInt(arraynow[0])) {
        if (parseInt(arraydealine[1]) < parseInt(arraynow[1])) {
          return "dealine-red";
        }
        if (parseInt(arraydealine[1]) == parseInt(arraynow[1])) {
          if (parseInt(arraydealine[2]) < parseInt(arraynow[2])) {
            return "dealine-red";
          }
        }
      }
    }
    return "dealine-green"
  }
}
