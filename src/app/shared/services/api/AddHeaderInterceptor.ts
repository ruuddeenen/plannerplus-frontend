import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable()
export class AddHeaderInterceptor implements HttpInterceptor {

  private token: string;

  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.token = localStorage.getItem('X-Firebase-Auth-Token');
    const clonedRequest = req.clone({
      headers: req.headers.set(
        'X-Firebase-Auth',
        this.token
      )
    });
    return next.handle(clonedRequest);
  }
}
