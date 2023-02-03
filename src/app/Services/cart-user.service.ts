import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from '../models/cart';
import { HttpClient } from '@angular/common/http';

const cartUserApi = `http://127.0.0.1:8000/api/users/${localStorage.getItem(
  'id'
)}/carts`;

const payCartApi = 'http://127.0.0.1:8000/api/stripe';
const addCartApi = 'http://127.0.0.1:8000/api/carts';
const editUserCartApi = 'http://127.0.0.1:8000/api/editUserCart';

@Injectable({
  providedIn: 'root',
})
export class CartUserService {
  constructor(private http: HttpClient) {}

  getUserCart(): Observable<Cart[]> {
    return this.http.get<Cart[]>(cartUserApi);
  }

  payUserCart(data: any) {
    return this.http.post<Cart>(payCartApi, data);
  }

  addUserCart(data: any): Observable<Cart[]> {
    return this.http.post<Cart[]>(addCartApi, data);
  }

  editUserCart(id: number, quantity: any) {
    return this.http.post<any>(`${editUserCartApi}/${id}`, quantity);
  }
}
