import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Shift } from './shift';

const _baseUrl = 'http://localhost:8008/api/shifts/'


@Injectable({ providedIn: 'root' })
export class ShiftService {

  constructor(private http: HttpClient) { }

  get(id: number): Observable<Shift>{
    return this.http.get<Shift>(_baseUrl + id)
  }

  getAll(): Observable<Shift[]> {
    return this.http.get<Shift[]>(_baseUrl)
  }

  getAllByEmployeeId(id: string) {
    return this.http.get<Shift[]>(_baseUrl + 'employee/' + id)
  }
}
