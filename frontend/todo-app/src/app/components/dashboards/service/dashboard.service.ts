import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dashboard, TaskList } from 'src/app/interface';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private http: HttpClient) { }

  getAllDashboards(): Observable<Dashboard[]> {
    return this.http.get<Dashboard[]>(
      `${environment.endPoint}/boards`
    );
  }

  getDashboardById(id: string): Observable<Dashboard> {
    return this.http.get<Dashboard>(`${environment.endPoint}/boards`);
  }

  createDashboard(body: any) {
    return this.http.post(
      `${environment.endPoint}/boards`,
      body
    );
  }

  createTask(body: any) {
    return this.http.post(
      `${environment.endPoint}/tasks`,
      body
    );
  }

  createTaskList(body: any) {
    return this.http.post(
      `${environment.endPoint}/taskList`,
      body
    );
  }
  getAllTaskList(boardsId: any): Observable<any> {
    return this.http.get<any>(
      `${environment.endPoint}/taskList/${boardsId}`
    );
  }
}
