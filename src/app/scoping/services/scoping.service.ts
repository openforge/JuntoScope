import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@env/environment';
import { switchMap, map, catchError } from 'rxjs/operators';
import { SessionValidation } from '@models/scoping-session';

@Injectable()
export class ScopingService {
  constructor(private http: HttpClient) {}

  validateSession(sessionValidation: SessionValidation) {
    console.log(sessionValidation);
    return this.http.get(
      `${environment.apiBaseUrl}/session-links/${
        sessionValidation.sessionLink
      }`,
      { params: { accessCode: sessionValidation.accessCode } }
    );
  }
}
