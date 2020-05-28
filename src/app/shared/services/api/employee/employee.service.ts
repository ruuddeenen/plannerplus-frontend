import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Employee} from './employee';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';


const URL = 'http://localhost:8008/api/employees/';

@Injectable({providedIn: 'root'})
export class EmployeeService {

  constructor(private http: HttpClient) {
  }

  getUrl(): string {
    return URL;
  }

  getEmployeeById(id: string): Observable<Employee> {
    return this.http.get<Employee>(URL + id);
  }

  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(URL).pipe(
      map((result: any) => {
        return result._embedded.employeeList;
      }));
  }

  post(employee: Employee) {
    console.log('POST', employee);
    this.http.post(URL, employee)
      .subscribe(
        data => {
          console.log(data);
        }
      );
  }
}
