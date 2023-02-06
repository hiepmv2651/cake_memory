import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  userProfileApi = `http://127.0.0.1:8000/api/users/${localStorage.getItem(
    'id'
  )}`;

  name = this.userService.userName;

  isUpdate: boolean = true;

  labelButton: string = 'Chỉnh sửa';

  userForm: any;

  error: any;

  ngOnInit() {
    this.error = null;
    this.getUserProfile();
  }

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private userService: UserService
  ) {}

  getUserProfile() {
    this.http.get<any>(this.userProfileApi).subscribe((data) => {
      this.userForm = this.fb.group({
        name: [data.name],
        email: [data.email],
        phone: [data.phone],
        address: [data.address],
        gender: [data.gender],
      });
    });
  }

  editUser() {
    this.error = null;
    if (this.labelButton === 'Chỉnh sửa') {
      this.isUpdate = false;
      this.labelButton = 'Cập nhật';
    } else {
      this.http.put<any>(this.userProfileApi, this.userForm.value).subscribe(
        (data) => {
          localStorage.setItem('name', this.userForm.value.name);
          this.name.next(this.userForm.value.name);
        },
        (error) => {
          this.error = error.error.errors;
        }
      );

      this.getUserProfile();
    }
  }

  cancel() {
    this.isUpdate = true;
    this.labelButton = 'Chỉnh sửa';
    this.getUserProfile();
  }
}
