import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { Task, TaskList } from 'src/app/interface';
import { DashboardService } from '../service/dashboard.service';
import { Guid } from 'guid-typescript';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  private dashboardId: string = "";
  private subscription: Subscription[] = []
  private draggedTask?: Task

  private newTaskMapping: string[] = []

  public isDisabledSubmitNewTask: boolean = false;
  public isCreateNewTask = false;
  public createListForm!: FormGroup;
  public displayCreateNewListDialog: boolean = false;

  taskLists: TaskList[] = []

  constructor(
    private activatedRoute: ActivatedRoute,
    private dashboardService: DashboardService,
    private form: FormBuilder
  ) { }

  ngOnInit(): void {
    this.fetchUrlData()

  }

  ngOnDestroy(): void {
    this.subscription.forEach((_scription) => {
      _scription.unsubscribe()
    })
  }



  newTaskList(): void {
    this.displayCreateNewListDialog = true;
    this.createListForm = this.form.group(
      {
        name: ["", [Validators.required]]
      }
    )

  }

  dragStartHandler(task: Task): void {
    this.draggedTask = task
  }

  dragEndHandler(): void {
    this.draggedTask = undefined
  }
  dropHandler(event: Event, taskList: TaskList): void {
    if (this.draggedTask) {
      this.taskLists.forEach(_list => {
        if (_list.id !== taskList.id) {
          _list.listTask = _list.listTask.filter(_task => {
            return _task.id !== this.draggedTask?.id
          })
        }
      })

      taskList.listTask = [...taskList.listTask, this.draggedTask];
    }
  }
  onCreateNewList(): void {
    let listName = this.createListForm.value.name
    this.taskLists.push(
      {
        id: Guid.create().toString(),
        listTask: [],
        title: listName
      }
    )
    this.displayCreateNewListDialog = false;
  }

  fetchUrlData(): void {
    this.subscription.push(
      this.activatedRoute.paramMap.pipe(switchMap((paramMap, index) => {
        this.dashboardId = paramMap.get("dashboardId") + ""
        return this.dashboardService.getDashboardById(this.dashboardId)
      })
      ).subscribe(_respone => {
        // Will be get an error
      }, error => {
        console.log(`this.dashboardService.getDashboardById(${this.dashboardId})`)
      }))
  }

  addNewTask(taskList: TaskList): void {
    this.isCreateNewTask = true;
    taskList.listTask.push({
      description: "",
      id: "newtask",
      name: ""
    })
  }
  submitNewTask(taskList: TaskList): void {
    taskList.listTask.forEach(_task => {
      if (_task.id === "newtask") {
        if (_task.name !== '') {
          this.isCreateNewTask = false;
          _task.id = Guid.create().toString()
          this.newTaskMapping.push(_task.id)
          // CALL API HERE
        }

      }
    })
  }
  cancelNewTask(taskList: TaskList): void {
    this.isCreateNewTask = false;
    taskList.listTask = taskList.listTask.filter(_task => _task.id !== "newtask")
  }

  deleteTask(task: Task, tasklist: TaskList) {
    tasklist.listTask = tasklist.listTask.filter(_x => {
      return _x.id !== task.id
    })
    if (this.newTaskMapping.some(_id => _id !== task.id)) {
      // CALL API DELETE HERE
    }
  }


}
