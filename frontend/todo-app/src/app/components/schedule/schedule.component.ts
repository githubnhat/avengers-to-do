import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CalendarOptions } from '@fullcalendar/angular';
import { of, Subscription, switchMap } from 'rxjs';
import { HandleMessageService } from 'src/app/services/handle-message.service';
import { DashboardService } from '../dashboards/service/dashboard.service';
import { TaskListService } from '../dashboards/service/task-list.service';
import { TaskService } from '../dashboards/service/task.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

  private subscription: Subscription[] = [];
  public isDisplayDetailDateDialog = false;
  public approvedMembers: any[] = []

  selectedDate = "";

  displayDetailTask: boolean = false;


  dashboardId: any;

  listTasks: any[] = []

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    dateClick: this.handleDateClick.bind(this),
    events: [
    ]
  };

  events: any[] = [];

  public selectedTask: any;


  constructor(
    private activatedRoute: ActivatedRoute,
    private dashboardService: DashboardService
  ) { }

  ngOnInit(): void {
    this.fetchUrlData();
    this.fetchMember();
  }

  markDone(task: any) {

  }

  onHidingDialog() {
    this.listTasks = [];
    this.isDisplayDetailDateDialog = false;

  }

  fetchData() {
    this.subscription.push(
      this.dashboardService.getDeadlineTasks(this.dashboardId).subscribe((_response: any) => {
        this.events = _response.map((_x: any) => {
          return {
            title: _x.taskName,
            date: _x.deadline,
            backgroundColor: this.validateColor(_x)
          }
        })
        this.calendarOptions.events = this.events;
      })
    )
  }

  closeDetailTask(event: any) {
    this.displayDetailTask = false;
  }

  fetchMember() {
    this.subscription.push(
      this.dashboardService.getApprovedUserInBoard(this.dashboardId).subscribe(_x => {
        this.approvedMembers = _x;
      })
    )
  }

  fetchUrlData(): void {
    this.subscription.push(
      this.activatedRoute.paramMap
        .pipe(
          switchMap((paramMap, index) => {
            this.dashboardId = paramMap.get('dashboardId') + '';
            return this.dashboardService.getDeadlineTasks(this.dashboardId);
          })
        )
        .subscribe(
          (_respone) => {
            this.events = _respone.map((_x: any) => {
              return {
                title: _x.taskName,
                date: _x.deadline,
                backgroundColor: this.validateColor(_x)
              }

            })
            this.calendarOptions.events = this.events;
          },
          (error) => {
            console.log();
          }
        )
    );
  }

  validateColor(task: any): string {
    let backgroundColor = "rgb(150, 150, 255)";
    if (new Date() > new Date(task.deadline)) {
      backgroundColor = "rgb(255, 123, 123)";
    }
    if (task.isDone) {
      backgroundColor = "rgb(151, 255, 151)";
    }
    return backgroundColor;
  }

  isBleeding(dateArr: any): boolean {

    return false;
  }


  selectTask(task: any) {
    this.selectedTask = task;
    this.displayDetailTask = true;
  }


  handleDateClick(arg: any) {
    this.selectedDate = arg.dateStr;
    this.subscription.push(
      this.dashboardService.getDeadlineByDate(this.dashboardId, this.selectedDate).subscribe((_response: any) => {
        this.listTasks = _response;
        this.isDisplayDetailDateDialog = true;
      }, error => {
      })
    )
  }

}
