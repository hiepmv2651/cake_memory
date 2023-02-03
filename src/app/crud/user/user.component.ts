import { ExportService } from './../../export.service';
import { UserService } from './../../Services/user.service';
import { Table } from 'primeng/table';
import { User } from './../../models/user';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent {
  users: User[] = [];

  loading: boolean = true;

  SERVER_URL = 'http://127.0.0.1:8000/api/importUser';
  uploadForm!: FormGroup;

  import: any = {
    file: null,
  };

  @ViewChild('dt') table!: Table;

  constructor(
    private userSerVice: UserService,
    private exportService: ExportService,
    private formBuilder: FormBuilder,
    private httpClient: HttpClient
  ) {}
  ngOnInit(): void {
    this.getUserList();
    this.uploadForm = this.formBuilder.group({
      file: [''],
    });
  }

  getUserList() {
    this.userSerVice.getUsers().subscribe((data) => {
      this.users = data;
      this.loading = false;
    });
  }

  export() {
    this.exportService.exportExcelUser().subscribe((response) => {
      let fileName = 'Danh sách người dùng';
      let blob: Blob = response.body as Blob;
      let a = document.createElement('a');
      a.download = fileName;
      a.href = window.URL.createObjectURL(blob);
      a.click();
    });
  }
}
