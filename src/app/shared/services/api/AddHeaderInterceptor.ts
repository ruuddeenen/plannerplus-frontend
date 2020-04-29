import {
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpEvent
} from '@angular/common/http';
import { Observable } from "rxjs";
import { AuthService } from '../auth/auth.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AddHeaderInterceptor implements HttpInterceptor {

    token: string

    constructor(
        public authService: AuthService
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.token = localStorage.getItem('X-Firebase-Auth-Token')
        const clonedRequest = req.clone({
            headers: req.headers.set(
                'X-Firebase-Auth',
                this.token
            )
        })
        //console.log('token: ',this.authService.getIdToken)
        return next.handle(clonedRequest)
    }
}