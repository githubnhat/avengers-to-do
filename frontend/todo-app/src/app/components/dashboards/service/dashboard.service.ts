import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dashboard, TaskList } from 'src/app/interface';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    }),
  };
  constructor(private http: HttpClient) {}

  getAllDashboards(): Observable<Dashboard[]> {
    return this.http.get<Dashboard[]>(
      `${environment.endPoint}/boards`,
      this.httpOptions
    );
  }

  getDashboardById(id: string): Observable<Dashboard> {
    return this.http.get<Dashboard>('');
  }

  createDashboard(body: any) {
    return this.http.post(
      `${environment.endPoint}/boards`,
      body,
      this.httpOptions
    );
  }

  createTask(body: any) {
    return this.http.post(
      `${environment.endPoint}/tasks`,
      body,
      this.httpOptions
    );
  }

  createTaskList(body: any) {
    return this.http.post(
      `${environment.endPoint}/taskList`,
      body,
      this.httpOptions
    );
  }
  getAllTaskList(boardsId: any): Observable<any> {
    return this.http.get<any>(
      `${environment.endPoint}/taskList/${boardsId}`,
      this.httpOptions
    );
  }
}
