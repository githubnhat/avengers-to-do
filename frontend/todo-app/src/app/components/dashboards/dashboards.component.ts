import { Guid } from 'guid-typescript';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BoardUser } from './../../interface';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Dashboard } from '../../interface';
import { DashboardService } from './service/dashboard.service';

@Component({
  selector: 'app-dashboards',
  templateUrl: './dashboards.component.html',
  styleUrls: ['./dashboards.component.scss'],
})
export class DashboardsComponent implements OnInit {
  public isCreateNewDashboard = false;

  public isDisabledSubmitNewDashboard: boolean = false;
  public createListForm!: FormGroup;
  public displayCreateNewListDialog: boolean = false;

  subscription: Array<Subscription> = new Array<Subscription>();

  mockDashboards: Dashboard[] = [
    {
      id: 'abc',
      createdBy: 'John',
      description: 'Here is description',
      name: 'Dashboard 1',
      createdDate: new Date().toDateString(),
      modifiedBy: '',
      modifiedDate: '',
    },
  ];
  item!: Dashboard;
  listDashboards: Dashboard[] = [];

  tableHeaders = [
    {
      field: 'name',
      header: 'Dashboard Name',
      className: 'dashboard-name',
      show: true,
    },
    {
      field: 'createdDate',
      header: 'Created Date',
      className: 'created-date',
      show: true,
    },
    {
      field: 'createdBy',
      header: 'Created By',
      className: 'created-by',
      show: true,
    },
  ];

  constructor(
    private dashboardService: DashboardService,
    private router: Router,
    private form: FormBuilder
  ) {}

  ngOnInit(): void {
    this.fetchDashboards();
    this.createListForm = this.form.group({
      name: [null, [Validators.required]],
      description: [null, [Validators.required]],
    });
    this.dashboardService.getAllDashboards().subscribe((data) => {
      this.listDashboards = data;
    });
  }

  onSelectDashboard(dashboardId: string): void {
    this.router.navigateByUrl(`dashboard/${dashboardId}`);
  }

  fetchDashboards(): void {
    this.subscription.push(
      this.dashboardService.getAllDashboards().subscribe(
        (_respone) => {},
        (_error) => {
          this.listDashboards = [...this.mockDashboards];
        }
      )
    );
  }
  // addNewDashboard(boardUser: BoardUser): void {
  //   this.isCreateNewDashboard = true;
  //   boardUser.listDashboard.push({
  //     id: '1',
  //     name: 'abc',
  //     description: 'abc',
  //     createdDate: '',
  //     createdBy: '',
  //   });
  // }

  newDashBoard(): void {
    this.displayCreateNewListDialog = true;
    let body = {
      name: this.createListForm.value.name,
      description: this.createListForm.value.description,
    };
    console.log(body);

    this.dashboardService.createDashboard(body).subscribe((data: any) => {
      this.item = data;
      console.log(data);

      this.listDashboards.push(this.item);
      console.log(this.listDashboards);
    });
    this.displayCreateNewListDialog = false;
    this.createListForm.reset();
  }
  onCreateNewList(): void {
    this.displayCreateNewListDialog = true;
  }
}
