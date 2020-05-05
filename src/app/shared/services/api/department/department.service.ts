import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Department } from './department';
import { map } from 'rxjs/operators'

const _baseUrl = 'http://localhost:8008/api/departments/'

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private http: HttpClient) { }

  get(id: number): Observable<Department> {
    return this.http.get<Department>(_baseUrl + id)
  }

  getAll(): Observable<Department[]> {
    return this.http.get<Department[]>(_baseUrl).pipe(
      map((result: any) => {
        return result._embedded.departmentList
      }))
  }
}
