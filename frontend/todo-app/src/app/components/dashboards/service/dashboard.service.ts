import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dashboard, Invitation, Member, MemberInBoard, TaskList } from 'src/app/interface';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private http: HttpClient) { }

  getAllDashboards(): Observable<Dashboard[]> {
    return this.http.get<Dashboard[]>(`${environment.endPoint}/boards`);
  }

  getDashboardById(id: string): Observable<Dashboard> {
    return this.http.get<Dashboard>(`${environment.endPoint}/boards`);
  }

  createDashboard(body: any) {
    return this.http.post(`${environment.endPoint}/boards`, body);
  }

  getTeamMembers(boardId: string): Observable<MemberInBoard[]> {
    return this.http.get<MemberInBoard[]>(
      `${environment.endPoint}/boards/${boardId}/users`
    );
  }

  getMembersCanInvite(boardId: string): Observable<Member[]> {
    return this.http.get<Member[]>(
      `${environment.endPoint}/invitation/board/${boardId}/users`
    );
  }
  addTeamMembers(body: any): Observable<MemberInBoard> {
    return this.http.post<MemberInBoard>(
      `${environment.endPoint}/invitation`,
      body
    );
  }

  updateDashboard(id: string, body: any) {
    return this.http.put(`${environment.endPoint}/boards/${id}`, body);
  }

  deleteDashboard(id: string) {
    return this.http.delete(`${environment.endPoint}/boards/${id}`);
  }

  getInvitationsOfUser(): Observable<Invitation[]> {
    return this.http.get<Invitation[]>(
      `${environment.endPoint}/invitation`,
    );
  }

  removeMemberInBoard(invitationId: number): Promise<any> {
    return this.http.delete<Invitation[]>(
      `${environment.endPoint}/invitation/${invitationId}`,
    ).toPromise();
  }

  updateInvitation(body: any): Promise<any> {
    return this.http.put(
      `${environment.endPoint}/invitation`,
      body
    ).toPromise();
  }

}
