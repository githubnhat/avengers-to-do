import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _httpHeaders!: HttpHeaders

  constructor(private http: HttpClient) { }

  get httpHeaders() {
    return this._httpHeaders
  }

  register(body: any): Promise<any> {
    return this.http.post(`${environment.endPoint}/register`, body).toPromise()
  }

  login(body: any): Promise<any> {
    return this.http.post(`${environment.endPoint}/login`, body).toPromise()
  }

  getHeader(accessToken: string): HttpHeaders {
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`
    })
    window.localStorage.setItem("accessToken", accessToken)
    this._httpHeaders = headers
    return headers
  }


}
