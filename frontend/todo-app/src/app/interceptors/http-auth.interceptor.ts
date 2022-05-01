import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Route, Router } from '@angular/router';
import { HandleMessageService } from '../services/handle-message.service';
import { Message } from '../interface';

@Injectable()
export class HttpAuthInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private handleMessageService: HandleMessageService
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMessage!: Message
          if (error.status === 403) {
            errorMessage = {
              detail: "Unauthorized",
              key: "toast",
              severity: "error",
              summary: "Error"
            }
            this.router.navigateByUrl("/login");
          } else {
            errorMessage = {
              detail: error.error.message,
              key: "toast",
              severity: "error",
              summary: "Error"
            }
          }
          if (errorMessage)
            this.handleMessageService.setMessage(errorMessage)
          return throwError(error.error)
        })
      )
  }
}
