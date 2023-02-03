import { Router } from '@angular/router';
import { UserService } from './../../Services/user.service';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  public isLogin$ = this.userService.loggedIn.asObservable();
  constructor(private userService: UserService, private route: Router) {}

  ngOnInit(): void {}

  visibleSidebar1: any;

  logout() {
    this.userService.logoutUser().subscribe((data) => {
      localStorage.clear();
    });
    this.route.navigate(['/']);
  }

  clickClose() {
    this.visibleSidebar1 = false;
  }
}