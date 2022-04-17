import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './services/auth.service';
import { Notification } from './services/notification';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'todo-app';
  items!: any[];

  constructor(
    private messageService: MessageService,
    private notification: Notification,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.checkAuth()
    this.notification.getNotification().subscribe(_message => {
      if (_message)
        this.messageService.add(_message)
    })
  }

  checkAuth() {
    console.log(window.localStorage.getItem("accessToken"))
    if (window.localStorage.getItem("accessToken")) {
      this.authService.getHeader(window.sessionStorage.getItem("accessToken") + "")
      this.router.navigateByUrl("/dashboards")
    }
  }

  showMessage(event: any) {
    console.log(event)
  }
}
