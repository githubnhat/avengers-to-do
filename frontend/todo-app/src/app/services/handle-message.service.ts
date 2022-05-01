import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Message } from '../interface';

@Injectable({
  providedIn: 'root'
})
export class HandleMessageService {

  private messageState = new BehaviorSubject<Message>({
    key: "toast",
    detail: '',
    severity: "null",
    summary: 'Error'
  });
  constructor() { }

  setMessage(message: Message): void {
    this.messageState.next(message)
  }

  getMessage(): Observable<Message> {
    return this.messageState.asObservable()
  }
}
