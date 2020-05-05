import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Shift } from './shift';
import { map, catchError } from "rxjs/operators";

const _baseUrl = 'http://localhost:8008/api/shifts/'


@Injectable({ providedIn: 'root' })
export class ShiftService {

  constructor(private http: HttpClient) { }

  get(id: number): Observable<Shift> {
    return this.http.get<Shift>(_baseUrl + id)
  }

  getAll(): Observable<Shift[]> {
    return this.http.get<Shift[]>(_baseUrl)
  }

  getAllByEmployeeId(id: string): Observable<Shift[]> {
    return this.http.get<Shift[]>(_baseUrl + '/employee/' + id)
  }

  getByDepartmentAndDate(depId: number, date: Date): Observable<Shift[]> {
    return this.http.get<Shift[]>(_baseUrl + '/dep/' + depId + '?ts=' + date.getTime()).pipe(
      map((result: any) => {
          return result._embedded.shiftList
      }), catchError(_ => {
        return []
      }))
  }
}
