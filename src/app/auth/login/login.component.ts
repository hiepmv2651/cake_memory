import { User } from 'src/app/models/user';
import { UserService } from './../../Services/user.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

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

  loginForm = this.fb.group({
    email: [''],
    password: [''],
  });

  click() {
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
          detail: error,
        });
        this.error = error.error.errors;
        console.log(this.error);
      }
    );
  }
}
