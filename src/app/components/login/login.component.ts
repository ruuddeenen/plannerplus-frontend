import { Component, OnInit, Input, Output } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit(): void { }


  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  submit(){
    if (this.form.valid){
      this.authService.login(
        this.form.controls.username.value,
        this.form.controls.password.value
      )
    }
  }

  logout(){
    this.authService.logout()
  }

  @Input() error: string | null
}
