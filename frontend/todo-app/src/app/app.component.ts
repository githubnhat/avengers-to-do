import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Message } from './interface';
import { AuthService } from './services/auth.service';
import { HandleMessageService } from './services/handle-message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'todo-app';
  items!: any[];
  private subscription: Subscription[] = []

  constructor(
    private messageService: MessageService,
    private handleMessageService: HandleMessageService
  ) { }

  ngOnInit() {
    this.subscription.push(
      this.handleMessageService.getMessage().subscribe((_message: Message) => {
        this.messageService.add(_message)
      })
    )
  }

  showMessage(event: any) {
    console.log(event)
  }
}
