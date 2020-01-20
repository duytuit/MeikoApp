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
import { map, catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthServiceService } from './Shareds/services/auth-service.service';
import { SessionService } from './Shareds/services/session.service';
 
@Injectable()
export class httpSetHeaders implements HttpInterceptor {
    constructor(private router: Router,  private auth: AuthServiceService,  private session: SessionService) {
       // this.session.accessToken=null
     }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       if (req.headers.get('No-Auth') == "True")
       return next.handle(req.clone());

    if (this.session.accessToken) {
        const clonedreq = req.clone({
            headers: req.headers.set("Authorization", "Bearer " + this.session.accessToken)
        });
        return next.handle(clonedreq).pipe(tap(
            succ => { },
            err => {
                if (err.status === 401)
                    this.router.navigateByUrl('');
                else (err.status === 403)
                this.router.navigateByUrl('/forbidden');
            }
        ))
        
    }
    else {
        this.router.navigateByUrl('');
    }
    }
}
 