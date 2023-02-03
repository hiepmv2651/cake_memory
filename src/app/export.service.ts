import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ExportService {
  constructor(private http: HttpClient) {}

  exportExcelUser() {
    return this.http.get('http://127.0.0.1:8000/api/exportUser', {
      observe: 'response',
      responseType: 'blob',
    });
  }

  exportExcelCart() {
    return this.http.get('http://127.0.0.1:8000/api/exportCart', {
      observe: 'response',
      responseType: 'blob',
    });
  }

  exportExcelCategory() {
    return this.http.get('http://127.0.0.1:8000/api/exportCategory', {
      observe: 'response',
      responseType: 'blob',
    });
  }

  exportExcelProduct() {
    return this.http.get('http://127.0.0.1:8000/api/exportProduct', {
      observe: 'response',
      responseType: 'blob',
    });
  }

  importExcel(file: any) {
    return this.http.post('http://127.0.0.1:8000/api/importUser', file);
  }
}
