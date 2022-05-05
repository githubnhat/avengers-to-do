import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _httpHeaders!: string
  private _isLogin = new BehaviorSubject<boolean>(false)
  constructor(private http: HttpClient) {
    this.getHeader()
  }

  get isLogin() {
    return this._isLogin;
  }

  setLogin(state: boolean) {
    this._isLogin.next(state)
  }

  get httpHeaders() {
    return this._httpHeaders
  }

  register(body: any): Promise<any> {
    return this.http.post(`${environment.endPoint}/register`, body).toPromise()
  }

  login(body: any): Promise<any> {
    return this.http.post(`${environment.endPoint}/login`, body).toPromise()
  }

  setHeader(accessToken: string): string {
    window.localStorage.setItem("accessToken", accessToken)
    this._httpHeaders = accessToken
    return accessToken
  }

  getHeader() {
    const accessToken = localStorage.getItem("accessToken")
    if (accessToken) {
      this._httpHeaders = accessToken;
      this.setLogin(true)
    }
  }

  logout() {
    if (localStorage.getItem("accessToken") != null) {
      localStorage.removeItem("accessToken");
      this._httpHeaders = '';
    }
  }


}
