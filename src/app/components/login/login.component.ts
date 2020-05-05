import { Component, OnInit, Input, Output } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  constructor(
    public authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void { }


  form: FormGroup = new FormGroup({
    username: new FormControl,
    password: new FormControl,
  });

  submit() {
    if (this.form.valid) {
      this.authService.login(
        this.form.controls.username.value,
        this.form.controls.password.value
      ).then(() => {
        this.authService.login(
          this.form.controls.username.value,
          this.form.controls.password.value).then(() =>
            this.router.navigateByUrl('/profile')
          )
      })
    }
  }

  @Input() error: string | null
}
