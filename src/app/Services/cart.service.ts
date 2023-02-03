import { Cart } from './../models/cart';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const cartApi = 'http://127.0.0.1:8000/api/carts';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient) {}

  getCarts(): Observable<Cart[]> {
    return this.http.get<Cart[]>(cartApi);
  }

  addCart(postData: any) {
    return this.http.post<Cart>(cartApi, postData);
  }

  editCart(postData: any, id: number) {
    return this.http.put<Cart>(`${cartApi}/${id}`, postData);
  }

  addEditCart(postData: any, selectedCart: any) {
    if (!selectedCart) {
      return this.http.post<Cart>(cartApi, postData);
    } else {
      return this.http.put<Cart>(`${cartApi}/${selectedCart.id}`, postData);
    }
  }

  deleteCart(id: number) {
    return this.http.delete<Cart>(`${cartApi}/${id}`);
  }
}
