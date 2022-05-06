import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }


  doneTask(body: any): Promise<any> {
    return this.http.put<any>(`${environment.endPoint}/tasks`, body).toPromise()
  }

  deleteTask(taskId: number): Promise<any> {
    return this.http.delete<any>(`${environment.endPoint}/tasks/${taskId}`, {}).toPromise()
  }

  changeIdTaskList(taskId: number, body: any): Promise<any> {
    return this.http.put<any>(`${environment.endPoint}/tasks/${taskId}`, body).toPromise()
  }
}
