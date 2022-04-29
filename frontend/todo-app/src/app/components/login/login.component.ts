import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { Notification } from 'src/app/services/notification';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Output() messageEmit = new EventEmitter()

  public loginForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private notification: Notification
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]]
    })
  }

  onSubmit(): void {
    let body = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password,
    }
    this.authService.login(body).then((_res) => {
      this.authService.setHeader(_res.accessToken)
      this.notification.setNotification({ key: "toast", severity: 'success', summary: 'Success', detail: 'Login successfully' });
      this.loginForm.setValue({
        username: [null],
        password: [null],
      })
      this.router.navigateByUrl("/dashboards")
    }, (error) => {
      this.notification.setNotification({ key: "toast", severity: 'error', summary: 'Error', detail: error.error.message });
    }
    )
  }

}
