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
  ) { }

  ngOnInit() {
    this.notification.getNotification().subscribe(_message => {
      if (_message)
        this.messageService.add(_message)
    })
  }

  showMessage(event: any) {
    console.log(event)
  }
}
