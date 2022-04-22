import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { PrimeNgModule } from './share/primeng.module';
import { DashboardsComponent } from './components/dashboards/dashboards.component';
import { HeaderComponent } from './share/components/header/header.component';
import { DashboardComponent } from './components/dashboards/dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from './services/auth.service';
import { AuthGuardsService } from './services/auth-guards.service';
import { CommentComponent } from './components/dashboards/dashboard/comment/comment.component';

const COMPONENTS = [
  AppComponent,
  LoginComponent,
  RegisterComponent,
  DashboardsComponent,
  HeaderComponent,
  DashboardComponent,
  CommentComponent,
];

const MODULES = [
  BrowserModule,
  BrowserAnimationsModule,
  AppRoutingModule,
  PrimeNgModule,
  HttpClientModule,
  ReactiveFormsModule,
  FormsModule,
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [...MODULES],
  providers: [MessageService, AuthGuardsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
