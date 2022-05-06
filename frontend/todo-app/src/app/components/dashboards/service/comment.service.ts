import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private http: HttpClient) {}

  comment(body: any) {
    return this.http.post<any>(`${environment.endPoint}/comment`, body);
  }
}
