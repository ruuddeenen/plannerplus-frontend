import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Shift} from './shift';
import {catchError, map} from 'rxjs/operators';

const URL = 'http://localhost:8008/api/shifts/';


@Injectable({providedIn: 'root'})
export class ShiftService {

  constructor(private http: HttpClient) {
  }

  get(id: number): Observable<Shift> {
    return this.http.get<Shift>(URL + id);
  }

  getAll(): Observable<Shift[]> {
    return this.http.get<Shift[]>(URL);
  }

  getAllByEmployeeId(id: string): Observable<Shift[]> {
    return this.http.get<Shift[]>(URL + '/employee/' + id);
  }

  getByDepartmentAndDate(depId: number, date: Date): Observable<Shift[]> {
    return this.http.get<Shift[]>(URL + '/dep/' + depId + '?ts=' + date.getTime()).pipe(
      map((result: any) => {
        return result._embedded.shiftList;
      }), catchError(_ => {
        return [];
      }));
  }
}
