import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { User } from 'src/app/shared/services/auth/user';
import { EmployeesComponent } from 'src/app/components/employees/employees.component';
import { EmployeeService } from 'src/app/shared/services/api/employee/employee.service';
import { Employee } from 'src/app/shared/services/api/employee/employee';
import { Router, ActivatedRoute } from '@angular/router';

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
  public employee: Employee

  constructor(
    public authService: AuthService,
    public employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('uuid')
    if (!this.id){
      this.id = JSON.parse(localStorage.getItem('user')).uid
    }
    this.initEmployee(this.id)
  }

  private initEmployee(id: string){
    this.employeeService.get(id)
      .subscribe(res => { this.employee = res })
  }

  navigateToPlanning() {
    this.router.navigateByUrl('/planning/' + this.id)
  }
}
