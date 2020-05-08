import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from 'src/app/shared/services/auth/auth.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  constructor(
    public authService: AuthService,
    private router: Router
  ) {
  }


  form: FormGroup = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
  });

  @Input() error: string | null;

  ngOnInit(): void {
  }

  submit() {
    if (this.form.valid) {
      this.authService.login(
        this.form.controls.username.value,
        this.form.controls.password.value
      ).then(() =>
        this.router.navigateByUrl('/profile')
      );
    }
  }
}
