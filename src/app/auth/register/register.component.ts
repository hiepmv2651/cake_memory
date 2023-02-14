import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UserService } from 'src/app/Services/user.service';
import {
  validateRequired,
  validateEmail,
  validateNumber,
  validatePassword,
  validateConfirmPassword,
} from 'src/app/validators';

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

  gt = [
    {
      name: 'male',
    },
    {
      name: 'female',
    },
  ];

  required = validateRequired;
  email = validateEmail;
  number = validateNumber;
  password = validatePassword;
  cpassword = validateConfirmPassword;

  token!: any;

  error!: any;

  registerForm: any = this.fb.group({
    name: [''],
    email: [''],
    address: [''],
    phone: [''],
    gender: [''],
    password: [''],
    password_confirmation: [''],
  });

  click() {
    if (!this.registerForm.invalid) {
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
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please fill all the fields',
      });
    }
  }
}
