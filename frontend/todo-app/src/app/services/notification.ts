import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class Notification {
  private notification = new BehaviorSubject(null);
  constructor() { }


  setNotification(message: any) {
    this.notification.next(message)
  }
  getNotification() {
    return this.notification;
  }
}
