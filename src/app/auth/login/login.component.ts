import { UserService } from './../../Services/user.service';
import { FormBuilder } from '@angular/forms';
import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { validateEmail, validateRequired } from 'src/app/validators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private messageService: MessageService,
    private router: Router
  ) {}
  name = this.userService.userName;
  token!: any;

  error!: any;

  required = validateRequired;
  email = validateEmail;

  loginForm: any = this.fb.group({
    email: [''],
    password: [''],
  });

  click() {
    if (!this.loginForm.invalid) {
      this.userService.loginUser(this.loginForm.value).subscribe(
        (data) => {
          localStorage.clear();
          this.token = data;
          localStorage.setItem('token', this.token.token);
          localStorage.setItem('id', this.token.id);
          localStorage.setItem('name', this.token.name);
          this.name.next(this.token.name);
          this.router.navigate(['/']);
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Sai tài khoản hoặc mật khẩu',
          });
          this.error = error.error.errors;
        }
      );
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please fill all the fields',
      });
    }
  }
}
