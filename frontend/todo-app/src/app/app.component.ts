import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'todo-app';
  items!: any[];
  ngOnInit() {
    this.items = [
      {
        label: 'Create',
        icon: 'pi pi-fw pi-plus',
      },
      {
        label: 'Login',
        icon: 'pi pi-user',
        routerLink: ['/login'],
      },
      {
        label: 'Register',
        icon: 'pi pi-user-plus',
        routerLink: ['/register'],
      },

      {
        label: 'Dashboard',
        icon: 'pi pi-check-square',
        routerLink: ['/dashboard'],
      },
    ];
  }
}
