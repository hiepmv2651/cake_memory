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
  fileUploadForm!: FormGroup;
  fileInputLabel!: string;

  users: User[] = [];

  loading: boolean = true;

  SERVER_URL = 'http://127.0.0.1:8000/api/importUser';

  @ViewChild('dt') table!: Table;

  constructor(
    private userSerVice: UserService,
    private exportService: ExportService,
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {}
  ngOnInit(): void {
    this.getUserList();
    this.fileUploadForm = this.formBuilder.group({
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

  onFileSelect(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];

      this.fileInputLabel = file.name;
      this.fileUploadForm.get('file')?.setValue(file);
    }
  }

  onFormSubmit() {
    const formData = new FormData();
    formData.append('file', this.fileUploadForm.get('file')?.value);
    formData.append('agentId', '007');

    this.http.post<any>(this.SERVER_URL, formData);
    this.getUserList();
  }
}
