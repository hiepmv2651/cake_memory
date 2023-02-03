import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private messageService: MessageService,
    private router: Router
  ) {}

  token!: any;

  error!: any;

  registerForm = this.fb.group({
    name: [''],
    email: [''],
    address: [''],
    phone: [''],
    gender: [''],
    password: [''],
    password_confirmation: [''],
  });

  click() {
    this.userService.registerUser(this.registerForm.value).subscribe(
      (data) => {
        this.router.navigate(['/login']);
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error,
        });
        this.error = error.error.errors;
      }
    );
  }
}
