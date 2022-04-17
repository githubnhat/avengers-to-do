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

const COMPONENTS = [
  AppComponent,
  LoginComponent,
  RegisterComponent,
  DashboardsComponent,
  HeaderComponent,
]

const MODULES = [
  BrowserModule,
  BrowserAnimationsModule,
  AppRoutingModule,
  PrimeNgModule,
  HttpClientModule,
]

@NgModule({
  declarations: [
    ...COMPONENTS,
    DashboardComponent
  ],
  imports: [
    ...MODULES
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
