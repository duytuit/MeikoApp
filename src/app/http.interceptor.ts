import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';
 
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
 
@Injectable()
export class httpSetHeaders implements HttpInterceptor {
    
    constructor(
        ) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
 
 
        if (!request.headers.has('Content-Type')) {
            request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
        }
 
        request = request.clone({ headers: request.headers.set('Accept', 'application/json') });
 
       // request = request.clone({ headers: request.headers.set('Freaky', 'Jolly') });
 
        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                  
                }
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                let data = {};
                data = {
                    message: error.message,
                    status:error.status,
                    ok:error.ok
                };
                
                return throwError(error);
            }));
    }
}
 