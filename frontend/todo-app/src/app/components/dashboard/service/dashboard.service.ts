import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from '../model/item-backlog';
@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private http: HttpClient) {}

  getAllItemBacklog() {
    return this.http.get<any>('assets/mock-data.json');
  }
  getAllItemBacklog2() {
    return this.http.get<any>('assets/mock-data2.json');
  }
}
