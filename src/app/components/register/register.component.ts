import {Component, OnInit} from '@angular/core';
import {AuthService} from 'src/app/shared/services/auth/auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Employee} from '../../shared/services/api/employee/employee';

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

  constructor(
    public authService: AuthService
  ) {
  }

  genders: Gender[] = [
    {value: 0, viewValue: 'Male'},
    {value: 1, viewValue: 'Female'}
  ];


  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
    place: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
    conf_password: new FormControl('', [Validators.required, Validators.minLength(5)])
  });

  ngOnInit(): void {
  }

  submit() {
    if (this.validate(this.form)) {
      const employee = this.createEmployee(this.form);
      const password = this.form.controls.password.value;

      this.authService.register(employee, password)
        .then(() => window.location.href = '/profile');
    }
  }

  validate(form: FormGroup): boolean {
    if (form.valid) {
      if (form.controls.password.value === form.controls.conf_password.value) {
        return true;
      }
    }
    return false;
  }

  createEmployee(form: FormGroup): Employee {
    const c = form.controls;
    return {
      uuid: '',
      name: c.name.value,
      surname: c.surname.value,
      email: c.email.value,
      phone: c.phone.value,
      gender: c.gender.value,
      place: c.place.value,
      bio: 'Tell more about yourself here..'
    };
  }
}
