import { Product } from 'src/app/models/product';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const productApi = 'http://127.0.0.1:8000/api/products';
const editProductApi = 'http://127.0.0.1:8000/api/edit';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(productApi);
  }

  addProduct(postData: any) {
    return this.http.post<Product>(productApi, postData);
  }

  editProduct(postData: any, id: number) {
    return this.http.post<Product>(`${editProductApi}/${id}`, postData);
  }

  addEditProduct(postData: any, selectedProduct: any) {
    if (!selectedProduct) {
      return this.http.post(productApi, postData);
    } else {
      return this.http.put(`${productApi}/${selectedProduct.id}`, postData);
    }
  }

  deleteProduct(id: number) {
    return this.http.delete<Product>(`${productApi}/${id}`);
  }
}
