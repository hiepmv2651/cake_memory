import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  form: FormGroup;
  constructor(public fb: FormBuilder, private http: HttpClient) {
    this.form = this.fb.group({
      name: [''],
      image: [null],
    });
  }
  ngOnInit() {}
  uploadFile(event: any) {
    const file = event.target.files[0];
    this.form.patchValue({
      image: file,
    });
    this.form.get('image')?.updateValueAndValidity();
  }
  submitForm() {
    var formData: any = new FormData();
    // formData.append('name', this.form.get('name').value);
    formData.append('image', this.form.get('image')?.value);
    this.http.post('http://127.0.0.1:8000/api/products', formData).subscribe({
      next: (response) => console.log(response),
      error: (error) => console.log(error),
    });
  }
}
