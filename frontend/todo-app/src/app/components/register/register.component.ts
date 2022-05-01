import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { HandleMessageService } from 'src/app/services/handle-message.service';

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
    private handleMessageSerive: HandleMessageService
  ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
      verifyPassword: [null, Validators.required]
    })
  }

  onSubmit(event: Event) {
    debugger
    event.preventDefault()
    if (this.registerForm.valid) {
      if (this.verifyPassword()) {
        let body = {
          username: this.registerForm.value.username,
          password: this.registerForm.value.password,
          fullName: this.registerForm.value.username
        }
        this.authService.register(body).then((_res) => {
          this.handleMessageSerive.setMessage({ key: "toast", severity: 'success', summary: 'Success', detail: 'Register successfully' });
          this.registerForm.setValue({
            username: [null],
            password: [null],
            verifyPassword: [null]
          })
        }, error => {
          this.handleMessageSerive.setMessage({ key: "toast", severity: 'error', summary: 'Error', detail: error.error.message });
        })
      } else {
        this.handleMessageSerive.setMessage({ key: "toast", severity: 'error', summary: 'Error', detail: "Doesn't match password" });
      }
    } else {
      this.handleMessageSerive.setMessage({ key: "toast", severity: 'error', summary: 'Error', detail: "Please fill out all of information" });
    }
  }

  verifyPassword(): boolean {
    return this.registerForm.value.password === this.registerForm.value.verifyPassword
  }

}
