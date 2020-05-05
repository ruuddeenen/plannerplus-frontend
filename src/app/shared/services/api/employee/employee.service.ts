import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from './employee';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";


const _baseUrl = 'http://localhost:8008/api/employees/'

@Injectable({ providedIn: 'root' })
export class EmployeeService {

  constructor(private http: HttpClient) { }

  get(id: string): Observable<Employee> {
    return this.http.get<Employee>(_baseUrl + id)
  }

  getAll(): Observable<Employee[]> {
    return this.http.get<Employee[]>(_baseUrl).pipe(
      map((result: any) => {
        return result._embedded.employeeList
      }))
  }

  post(employee: Employee) {
    console.log('POST', employee)
    this.http.post(_baseUrl, employee)
      .subscribe(
        data => {
          console.log(data)
        }
      )
  }
}