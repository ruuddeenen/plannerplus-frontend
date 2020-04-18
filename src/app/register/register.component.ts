import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit(): void {
  }


  form: FormGroup = new FormGroup({
    name: new FormControl,
    surname: new FormControl,
    email: new FormControl,
    password: new FormControl,
    confpassword: new FormControl
  })

  submit() {
    if (this.form.valid) {
      if (this.form.controls.password.value === this.form.controls.confpassword.value) {
          if (this.authService.register(
            this.form.controls.name.value,
            this.form.controls.surname.value,
            this.form.controls.email.value,
            this.form.controls.password.value
          )){
            window.location.href = '/profile'
          }
      }
    }
  }
}