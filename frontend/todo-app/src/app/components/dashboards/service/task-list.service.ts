import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskListService {

  constructor(private http: HttpClient) { }


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

  deleteTaskList(taskListId: number): Promise<any> {
    return this.http.delete(
      `${environment.endPoint}/taskList/${taskListId}`
    ).toPromise();
  }

  getAllTaskList(boardsId: any): Observable<any> {
    return this.http.get<any>(
      `${environment.endPoint}/taskList/${boardsId}`
    );
  }

  updateTaskList(body: any): Promise<any> {
    return this.http.put<any>(
      `${environment.endPoint}/taskList`,
      body
    ).toPromise()
  }
}
