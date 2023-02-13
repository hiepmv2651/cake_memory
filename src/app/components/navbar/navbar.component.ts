import { validateRequired } from 'src/app/validators';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from './../../Services/user.service';
import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  displayProfile: boolean = false;

  modalPass: boolean = false;

  error: any;

  name = this.userService.userName;
  public isLogin$ = this.userService.loggedIn.asObservable();
  constructor(
    private userService: UserService,
    private route: Router,
    private fb: FormBuilder,
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  required = validateRequired;

  ngOnInit(): void {}

  visibleSidebar1: any;

  updatePassForm: any = this.fb.group({
    current_password: [''],
    new_password: [''],
    confirm_new_password: [
      '',
      [Validators.required, this.matchPassword.bind(this)],
    ],
  });

  matchPassword(formControl: FormControl): { [key: string]: boolean } {
    if (this.updatePassForm) {
      const password = this.updatePassForm.controls.new_password.value;
      const confirmPassword = formControl.value;

      if (password !== confirmPassword) {
        return { passwordsDoNotMatch: true };
      }
    }

    return null as any;
  }

  logout() {
    this.name.next('');
    this.userService.logoutUser().subscribe((data) => {
      localStorage.clear();
    });
    this.route.navigate(['/']);
  }

  clickClose() {
    this.visibleSidebar1 = false;
  }

  profile() {
    this.displayProfile = !this.displayProfile;
  }

  changePass() {
    this.modalPass = !this.modalPass;
  }

  change() {
    this.http
      .post<any>(
        'http://127.0.0.1:8000/api/changpass',
        this.updatePassForm.value
      )
      .subscribe(
        (res) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Thành công',
            detail: 'Đổi mật khẩu thành công',
          });
          this.modalPass = false;
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Thất bại',
            detail: 'Đổi mật khẩu thất bại',
          });
        }
      );
  }
}
