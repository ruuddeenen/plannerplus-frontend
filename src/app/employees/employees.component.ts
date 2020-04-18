import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../shared/services/api/employee/employee.service';
import { Observable } from 'rxjs';
import { Employee } from '../shared/services/api/employee/employee';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  displayedColumns: string[] = ['name', 'surname', 'profile']
  dataSource: MatTableDataSource<Employee>;

  constructor(
    public employeeService: EmployeeService) {

  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource()
    this.employeeService.getAllEmployees().subscribe(res => {
      this.dataSource.data = res
      console.log(res)
    })
  }

}
