import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Department} from './department';
import {map} from 'rxjs/operators';

const URL = 'http://localhost:8008/api/departments/';

@Injectable({
  providedIn: 'root'
})

export class DepartmentService {

  constructor(private http: HttpClient) {
  }

  getUrl(): string {
    return URL;
  }

  getDepartmentById(id: number): Observable<Department> {
    return this.http.get<Department>(URL + id);
  }

  getAllDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(URL).pipe(
      map((result: any) => {
        return result._embedded.departmentList;
      }));
  }
}
