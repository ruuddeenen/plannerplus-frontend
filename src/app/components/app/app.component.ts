import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../shared/services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  constructor(
    public authService: AuthService,
  ) {
  }

  public title = 'Planner+';

  ngOnInit(): void {
    console.log(location.pathname);
  }

  logout() {
    this.authService.logout().then(() => console.log('Logged out!'));
    window.location.href = '/';
  }
}
