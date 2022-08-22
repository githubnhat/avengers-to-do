import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardsComponent } from './components/dashboards/dashboards.component';
import { DashboardComponent } from './components/dashboards/dashboard/dashboard.component';
import { AuthGuardsService } from './services/auth-guards.service';
import { LoginGuardService } from './services/login-guard.service';
import { InvitationsComponent } from './components/invitations/invitations.component';
import { ScheduleComponent } from './components/schedule/schedule.component';

const routes: Routes = [
  {
    path: 'login', component: LoginComponent,
    canActivate: [LoginGuardService]
  },
  { path: 'register', component: RegisterComponent },
  {
    path: 'dashboards',
    component: DashboardsComponent,
    canActivate: [AuthGuardsService]
  },
  {
    path: 'invitations',
    component: InvitationsComponent,
    canActivate: [AuthGuardsService]
  },
  {
    path: 'dashboard/:dashboardId',
    component: DashboardComponent,
    canActivate: [AuthGuardsService]
  },
  {
    path: '',
    component: DashboardsComponent,
    canActivate: [AuthGuardsService]
  },
  {
    path: 'schedule/:dashboardId',
    component: ScheduleComponent,
    canActivate: [AuthGuardsService]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
