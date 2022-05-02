import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HandleMessageService } from 'src/app/services/handle-message.service';
import { Dashboard } from '../../interface';
import { DashboardService } from './service/dashboard.service';

@Component({
  selector: 'app-dashboards',
  templateUrl: './dashboards.component.html',
  styleUrls: ['./dashboards.component.scss'],
})
export class DashboardsComponent implements OnInit, OnDestroy {
  public isCreateNewDashboard = false;

  public isDisabledSubmitNewDashboard: boolean = false;
  public createListForm!: FormGroup;
  public editForm!: FormGroup;
  public displayCreateNewListDialog: boolean = false;
  public displayEditBoard: boolean = false;

  private selectedBoardId: string = '';

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
  listDashboards: Dashboard[] = [];

  taskListid: any;

  tableHeaders = [
    {
      field: 'name',
      header: 'Workboard Name',
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
    {
      field: 'description',
      header: 'Description',
      className: 'description',
      show: true,
    },
  ];

  constructor(
    private dashboardService: DashboardService,
    private router: Router,
    private form: FormBuilder,
    private handleMessageService: HandleMessageService
  ) {}

  ngOnInit(): void {
    this.fetchDashboards();
    this.createListForm = this.form.group({
      name: [null, [Validators.required]],
      description: [null, [Validators.required]],
    });
    this.editForm = this.form.group({
      name: [null, [Validators.required]],
      description: [null, [Validators.required]],
    });
  }

  onSelectDashboard(dashboardId: string): void {
    this.router.navigateByUrl(`dashboard/${dashboardId}`);
  }

  fetchDashboards(): void {
    this.subscription.push(
      this.dashboardService.getAllDashboards().subscribe((data) => {
        this.listDashboards = data;
        console.log(data);
      })
    );
  }

  newDashBoard(): void {
    this.displayCreateNewListDialog = true;
    let body = {
      name: this.createListForm.value.name,
      description: this.createListForm.value.description,
    };
    this.dashboardService.createDashboard(body).subscribe((data: any) => {
      this.listDashboards.push(data.data);
      this.handleMessageService.setMessage({
        key: 'toast',
        severity: 'success',
        summary: 'Success',
        detail: 'Create workboard successfully',
      });
      this.fetchDashboards();
    });
    this.displayCreateNewListDialog = false;
    this.createListForm.reset();
  }

  onCreateNewList(): void {
    this.displayCreateNewListDialog = true;
  }

  showEdit() {
    this.displayEditBoard = true;
  }
  onEditDashboard(dashboard: Dashboard): void {
    console.log(dashboard);
    this.displayEditBoard = true;
    this.selectedBoardId = dashboard.id;
    console.log(this.selectedBoardId);

    this.editForm = this.form.group({
      name: [dashboard.name, [Validators.required]],
      description: [dashboard.description, [Validators.required]],
    });
  }

  onUpdateDashBoard(): void {
    let body = {
      name: this.editForm.value.name,
      description: this.editForm.value.description,
    };
    this.dashboardService.updateDashboard(this.selectedBoardId, body).subscribe(
      (data: any) => {
        this.handleMessageService.setMessage({
          key: 'toast',
          severity: 'success',
          summary: 'Success',
          detail: 'Update workboard successfully',
        });
        this.fetchDashboards();
      },
      () => {
        this.handleMessageService.setMessage({
          key: 'toast',
          severity: 'error',
          summary: 'Error',
          detail: 'Update workboard failed',
        });
      }
    );
    this.displayEditBoard = false;
    this.editForm.reset();
  }

  onDeleteDashboard(dashboard: Dashboard): void {
    this.dashboardService.deleteDashboard(dashboard.id).subscribe((data) => {
      this.handleMessageService.setMessage({
        key: 'toast',
        severity: 'success',
        summary: 'Success',
        detail: 'Delete workboard successfully',
      });
      this.fetchDashboards();
    });
  }

  ngOnDestroy(): void {
    this.subscription.forEach((_x) => {
      _x.unsubscribe();
    });
  }
}
