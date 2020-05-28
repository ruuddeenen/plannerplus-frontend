import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../shared/services/auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  constructor(
    public authService: AuthService,
    public router: Router
  ) {
  }

  title = 'Planner+';
  isExpanded = true;

  ngOnInit(): void {
    console.log(location.pathname);
  }

  logout() {
    this.authService.logout().then(_ => this.router.navigate(['login']));
    window.location.href = '/';
  }
}
