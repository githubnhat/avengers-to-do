import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import {ButtonModule} from 'primeng/button';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  paramText: string = '';
  items: MenuItem[] = [
    {
      label: 'Dashboards',
      icon: 'pi pi-check-square',
      routerLink: ['/dashboards'],
    },
  ];
  activeMenuLink: string = '';
  activeMenuItem: string = '';
  private _history: string[] = [];

  is_login:any;
  constructor(
    private router: Router, 
    private location: Location,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.fetchUrlData();
    this.update();
  }

  
  back(): void {
    this._history.pop();
    if (this._history.length > 0) {
      this.location.back();
    } else {
      this.router.navigateByUrl('/');
    }
  }

  fetchUrlData(): void {
    this.router.events.subscribe((_res) => {
      if (_res instanceof NavigationEnd) {
        this._history.push(_res.urlAfterRedirects);
        this.paramText = _res.url.split('/')[1];
        switch (this.paramText) {
          default:
            break;
        }
      }
    });
  }


  update(){
    setInterval(()=>{
      this.is_login = localStorage.getItem("accessToken");
    },1000)
  }

  logout(){
      this.authService.logout();
      this.router.navigate(["/login"]);
      window.location.reload();
  }
}
