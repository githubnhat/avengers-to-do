import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Message } from './interface';
import { AuthService } from './services/auth.service';
import { HandleMessageService } from './services/handle-message.service';
import { LoaderService } from './services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'todo-app';
  items!: any[];
  private subscription: Subscription[] = []

  public isLoading = false;

  constructor(
    private messageService: MessageService,
    private handleMessageService: HandleMessageService,
    private loaderService: LoaderService
  ) { }

  ngOnInit() {
    this.subscription.push(
      this.handleMessageService.getMessage().subscribe((_message: Message) => {
        this.messageService.add(_message)
      })
    )
    this.subscription.push(
      this.loaderService.isLoading.asObservable().subscribe((_isLoading) => {
        this.isLoading = _isLoading
      })
    )
  }
}
