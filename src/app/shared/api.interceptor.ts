import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { switchMap, take, catchError } from 'rxjs/operators';

import { AngularFireAuth } from 'angularfire2/auth';

import { environment } from '../../environments/environment';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor(private afAuth: AngularFireAuth) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!req.url.includes(environment.apiBaseUrl)) {
      return next.handle(req);
    }

    return this.afAuth.authState.pipe(
      take(1),
      switchMap(user => user.getIdToken()),
      switchMap(idToken => {
        const headers = req.headers.set('Authorization', `Bearer ${idToken}`);
        const authReq = req.clone({ headers });

        return next.handle(authReq).pipe(
          catchError(response => {
            if (response instanceof HttpErrorResponse) {
              return throwError(response.error);
            }

            return throwError(response);
          })
        );
      })
    );
  }
}
