import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dashboard } from 'src/app/interface';
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
}
