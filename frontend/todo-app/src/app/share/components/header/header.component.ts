import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import jwt_decode from "jwt-decode";
import { DashboardService } from 'src/app/components/dashboards/service/dashboard.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  userFullName: string = ''
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

  isLogin: boolean = false;;
  constructor(
    private router: Router,
    private location: Location,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.fetchUrlData();
    this.checkLogin();
  }

  decodeJwt(): void {
    let token = this.authService.httpHeaders;
    let decoded: any = jwt_decode(token);
    this.userFullName = decoded.fullName;
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


  checkLogin() {
    this.authService.isLogin.subscribe(_state => {
      this.isLogin = _state
      if (this.isLogin === true) {
        this.decodeJwt();
      }
    })
  }

  logout() {
    this.authService.logout();
    this.authService.setLogin(false)
    this.router.navigate(["/login"]);
    window.location.reload();
  }
  showInvitations(): void {
    this.router.navigateByUrl('/invitations')

  }
}
