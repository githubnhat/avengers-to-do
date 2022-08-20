import { Page } from './../../interface';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LazyLoadEvent } from 'primeng/api/lazyloadevent';
import { Subscription, finalize } from 'rxjs';
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

  listDashboards: Dashboard[] = [];
  taskListid: any;

  first = 0;
  
  rows = 10;

  totalRecords= 0;

  tableHeaders = [
    {
      field: 'name',
      header: 'Workboard Name',
      className: 'name',
      show: true,
    },
    {
      field: 'createdDate',
      header: 'Created Date',
      className: 'created_date',
      show: true,
    },
    {
      field: 'createdBy',
      header: 'Created By',
      className: 'created_by',
      show: true,
    },
    {
      field: 'description',
      header: 'Description',
      className: 'description',
      show: true,
    },
    {
      field: 'percentDone',
      header: 'Progress',
      className: 'progress',
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
    const body = {
      page: 1,
      limit: this.rows,
      sortBy: null,
      sortDesc: 1,
    }
    this.subscription.push(
      this.dashboardService.getAllDashboards(body).subscribe((data) => {
        this.totalRecords = data?.data.totalItems
        this.listDashboards = data?.data?.data;
        console.log(this.listDashboards);
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
  loadBoardsLazy(event: LazyLoadEvent) {
    
    console.log("event.first",event.first)
    const body = {
      page: event.first == 0 ? 1 : (event.rows != undefined && event.first!= undefined) ? (event.first/event.rows) + 1 : 1,
      limit:  event.rows,
      sortBy: event.sortField === undefined ? null : event.sortField,
      sortDesc: event.sortOrder,
    }
    this.subscription.push(
      this.dashboardService.getAllDashboards(body).subscribe((data) => {
        this.listDashboards = data?.data?.data;
      })
    );
    event.first = (this.first + this.rows);
  }
}
