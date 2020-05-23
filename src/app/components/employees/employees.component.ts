import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from '../../shared/services/api/employee/employee.service';
import { Employee } from '../../shared/services/api/employee/employee';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Department } from '../../shared/services/api/department/department';
import { DepartmentService } from 'src/app/shared/services/api/department/department.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  selectedValue: number;
  departments: Department[];
  displayedColumns: string[] = ['name', 'surname', 'email', 'phone'];
  employeesDataSource = new MatTableDataSource<Employee>();
  allEmployees: Employee[];

  constructor(
    public employeeService: EmployeeService,
    public departmentService: DepartmentService
  ) { }

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnInit(): void {
    this.employeesDataSource.sort = this.sort;
    this.initEmployees();
    this.initDepartments();
  }

  handleChange(event: { value: number; }) {
    console.log(event);
    if (event.value === undefined) {
      this.employeesDataSource.data = this.allEmployees;
      return;
    }

    this.departmentService.getDepartmentById(event.value).subscribe(res => {
      this.employeesDataSource.data = res.employees;
    });
  }

  private initEmployees() {
    this.employeeService.getAll().subscribe(res => {
      this.allEmployees = res;
      this.employeesDataSource.data = res;
    });
  }

  private initDepartments() {
    this.departmentService.getAllDepartments().subscribe(res => {
      this.departments = res;
    });
  }
}
