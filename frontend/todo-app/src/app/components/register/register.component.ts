import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { Notification } from 'src/app/services/notification';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registerForm!: FormGroup

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private notification: Notification
  ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
      verifyPassword: [null, Validators.required]
    })
  }

  onSubmit(event: Event) {
    event.preventDefault()
    if (this.registerForm.valid) {
      if (this.verifyPassword()) {
        let body = {
          username: this.registerForm.value.username,
          password: this.registerForm.value.password,
          fullName: this.registerForm.value.username
        }
        this.authService.register(body).then((_res) => {
          this.notification.setNotification({ key: "register", severity: 'success', summary: 'Success', detail: 'Register successfully' });
          this.registerForm.setValue({
            username: [null],
            password: [null],
            verifyPassword: [null]
          })
        }, error => {
          this.notification.setNotification({ key: "register", severity: 'error', summary: 'Error', detail: error.error.message });
        })
      } else {
        this.notification.setNotification({ key: "register", severity: 'error', summary: 'Error', detail: "Doesn't match password" });
      }
    } else {
      this.notification.setNotification({ key: "register", severity: 'error', summary: 'Error', detail: "Please fill out all of information" });
    }
  }

  verifyPassword(): boolean {
    return this.registerForm.value.password === this.registerForm.value.verifyPassword
  }

}
