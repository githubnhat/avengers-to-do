import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Dashboard } from '../../interface';
import { DashboardService } from './service/dashboard.service';

@Component({
  selector: 'app-dashboards',
  templateUrl: './dashboards.component.html',
  styleUrls: ['./dashboards.component.scss']
})
export class DashboardsComponent implements OnInit {

  subscription: Array<Subscription> = new Array<Subscription>()

  mockDashboards: Dashboard[] = [
    {
      id: "abc",
      create_by: "John",
      description: "Here is description",
      name: "Dashboard 1",
      created_date: new Date().toDateString()

    }
  ]

  listDashboards: Dashboard[] = []

  tableHeaders = [{
    field: "name",
    header: "Dashboard Name",
    className: "dashboard-name",
    show: true
  },
  {
    field: "created_date",
    header: "Created Date",
    className: "created-date",
    show: true
  },
  {
    field: "create_by",
    header: "Created By",
    className: "created-by",
    show: true
  }
  ]

  constructor(
    private dashboardService: DashboardService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fetchDashboards()
  }

  onSelectDashboard(dashboardId: string): void {
    this.router.navigateByUrl(`dashboard/${dashboardId}`)
  }

  fetchDashboards(): void {
    this.subscription.push(
      this.dashboardService.getAllDashboards().subscribe(_respone => {
      }, _error => {
        this.listDashboards = [...this.mockDashboards]
      })
    )
  }

}
