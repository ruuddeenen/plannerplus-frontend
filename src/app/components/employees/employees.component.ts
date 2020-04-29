import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from '../../shared/services/api/employee/employee.service';
import { Employee } from '../../shared/services/api/employee/employee';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  displayedColumns: string[] = ['name', 'surname', 'email', 'phone']
  dataSource = new MatTableDataSource<Employee>()

  constructor(
    public employeeService: EmployeeService) {

  }
  
  @ViewChild(MatSort, { static: true }) sort: MatSort

  ngOnInit(): void {
    this.dataSource.sort = this.sort
    this.employeeService.getAllEmployees().subscribe(res => {
      this.dataSource.data = res
      console.log(res)
    })
  }


}
