import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { switchMap, take } from 'rxjs/operators';
import * as firebase from 'firebase';

import { AngularFireAuth } from 'angularfire2/auth';

import { environment } from '../environments/environment';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private afAuth: AngularFireAuth) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url.search(environment.firebase.apiBaseUrl) === -1) {
      return next.handle(request);
    }
    return this.afAuth.authState.pipe(
      take(1),
      switchMap((user: firebase.User) => user.getIdToken(true)),
      switchMap(idToken => {
        const headers = request.headers.set('Authorization', `Bearer ${idToken}`);
        const req = request.clone({ headers });
        return next.handle(req);
      })
    );
  }
}
