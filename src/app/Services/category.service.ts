import { Category } from './../models/category';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

const categoryApi = 'http://127.0.0.1:8000/api/categories';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(categoryApi);
  }

  addCategory(postData: any) {
    return this.http.post<Category>(categoryApi, postData);
  }

  editCategory(postData: any, id: number) {
    return this.http.put<Category>(`${categoryApi}/${id}`, postData);
  }

  addEditCategory(postData: any, selectedCategory: any) {
    if (!selectedCategory) {
      return this.http.post<Category>(categoryApi, postData);
    } else {
      return this.http.put<Category>(
        `${categoryApi}/${selectedCategory.id}`,
        postData
      );
    }
  }

  deleteCategory(id: number) {
    return this.http.delete<Category>(`${categoryApi}/${id}`);
  }
}
