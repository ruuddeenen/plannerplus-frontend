import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth/auth.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  constructor(
    public authService: AuthService,
  ) { }
  ngOnInit(): void {
    console.log(location.pathname)
  }

  title = 'Planner+'
  showSideNav = true

  logout() {
    this.authService.logout()
    window.location.href = '/'
  }
}
