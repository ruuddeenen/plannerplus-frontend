import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { User } from 'src/app/shared/services/user/user';
import { EmployeesComponent } from 'src/app/components/employees/employees.component';
import { EmployeeService } from 'src/app/shared/services/api/employee/employee.service';
import { Employee } from 'src/app/shared/services/api/employee/employee';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  genders = [
    'Male',
    'Female'
  ]

  private id: string
  public user: User
  public employee: Employee

  constructor(
    public authService: AuthService,
    public employeeService: EmployeeService
  ) { }

  ngOnInit(): void {
    this.id = this.getId(location.pathname)
    this.employeeService.get(this.id)
      .subscribe(res => { this.employee = res })
  }

  private getId(path: string): string {
    const id = path.replace('/', '').replace('profile', '')
    if (id.length < 1) {
      return JSON.parse(localStorage.getItem('user')).uid
    } else {
      return id
    }
  }

}
