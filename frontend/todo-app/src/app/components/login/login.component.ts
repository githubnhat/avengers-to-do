import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { HandleMessageService } from 'src/app/services/handle-message.service';

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
    private handleMessageService: HandleMessageService
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
      this.handleMessageService.setMessage({ key: "toast", severity: 'success', summary: 'Success', detail: 'Login successfully' });
      this.loginForm.setValue({
        username: [null],
        password: [null],
      })
      this.authService.setLogin(true);
      this.router.navigateByUrl("/dashboards")

    }
    )
  }

}
