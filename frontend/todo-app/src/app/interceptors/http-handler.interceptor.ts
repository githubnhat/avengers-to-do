import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class HttpHandlerInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!request.url.includes('api/v1/login') && !request.url.includes('api/v1/register')) {
      const authReq = request.clone({
        headers: request.headers
          .set('Content-Type', 'application/json')
          .set('Authorization', `${this.authService.httpHeaders}`)
      });
      return next.handle(authReq);
    } else {
      return next.handle(request);
    }

  }
}
