import { User } from './../models/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, shareReplay } from 'rxjs';

const userApi = 'http://127.0.0.1:8000/api/users';
const loginApi = 'http://127.0.0.1:8000/api/login';
const logoutApi = 'http://127.0.0.1:8000/api/logout';
const registerApi = 'http://127.0.0.1:8000/api/register';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    localStorage.getItem('token') ? true : false
  );

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(userApi);
  }

  registerUser(postData: any) {
    return this.http.post<User>(registerApi, postData);
  }

  loginUser(login: any): Observable<User[]> {
    this.loggedIn.next(true);
    return this.http.post<User[]>(loginApi, login).pipe(shareReplay());
  }

  logoutUser() {
    this.loggedIn.next(false);
    return this.http.post(logoutApi, {});
  }
}
