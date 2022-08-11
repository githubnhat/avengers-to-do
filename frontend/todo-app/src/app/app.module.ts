import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PrimeNgModule } from './share/primeng.module';
import { DashboardsComponent } from './components/dashboards/dashboards.component';
import { HeaderComponent } from './share/components/header/header.component';
import { DashboardComponent } from './components/dashboards/dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from './services/auth.service';
import { AuthGuardsService } from './services/auth-guards.service';
import { HttpAuthInterceptor } from './interceptors/http-auth.interceptor';
import { HttpHandlerInterceptor } from './interceptors/http-handler.interceptor';
import { TeamMembersDialogComponent } from './components/dashboards/dashboard/components/team-members-dialog/team-members-dialog.component';
import { LoadingPageComponent } from './components/loading-page/loading-page.component';
import { LoaderService } from './services/loader.service';
import { LoaderInterceptor } from './interceptors/loader.interceptor';
import { DetailTaskComponent } from './components/dashboards/dashboard/components/detail-task/detail-task.component';
import { HttpErrorInterceptor } from './interceptors/http-error.interceptor';
import { InvitationsComponent } from './components/invitations/invitations.component';
import { ProgressBarModule } from 'primeng/progressbar';

const COMPONENTS = [
  AppComponent,
  LoginComponent,
  RegisterComponent,
  DashboardsComponent,
  HeaderComponent,
  DashboardComponent,
  TeamMembersDialogComponent,
  LoadingPageComponent,
  DetailTaskComponent,
];

const MODULES = [
  BrowserModule,
  BrowserAnimationsModule,
  AppRoutingModule,
  PrimeNgModule,
  HttpClientModule,
  ReactiveFormsModule,
  FormsModule,
  ProgressBarModule,
];

@NgModule({
  declarations: [...COMPONENTS, InvitationsComponent],
  imports: [...MODULES],
  providers: [
    MessageService,
    AuthGuardsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpHandlerInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpAuthInterceptor,
      multi: true,
    },

    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
