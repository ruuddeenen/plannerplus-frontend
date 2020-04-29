import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Employee } from "../../shared/services/api/employee/employee";

interface Gender {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  genders: Gender[] = [
    { value: 0, viewValue: 'Male' },
    { value: 1, viewValue: 'Female' }
  ]

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit(): void {
  }


  form: FormGroup = new FormGroup({
    name: new FormControl,
    surname: new FormControl,
    gender: new FormControl,
    email: new FormControl,
    phone: new FormControl,
    place: new FormControl,
    password: new FormControl,
    confpassword: new FormControl
  })

  submit() {
    if (this.form.valid) {
      if (this.form.controls.password.value === this.form.controls.confpassword.value) {
        const password = this.form.controls.password.value
        const c = this.form.controls;
        const employee = {
          uuid: '',
          name: c.name.value,
          surname: c.surname.value,
          email: c.email.value,
          phone: c.phone.value,
          gender: c.gender.value,
          place: c.place.value,
          bio: 'Tell more about yourself here..'
        }
        console.log(employee)
        this.authService.register(employee, password)
      }
    }
  }
}