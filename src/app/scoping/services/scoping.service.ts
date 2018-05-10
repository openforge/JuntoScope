import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@env/environment';
import { switchMap, map, catchError } from 'rxjs/operators';
import { SessionValidation, ScopingSession } from '@models/scoping-session';
import { AppFacade } from '@app/state/app.facade';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable()
export class ScopingService {
  constructor(
    private appFacade: AppFacade,
    private afs: AngularFirestore,
    private http: HttpClient
  ) {}

  validateSession(sessionValidation: SessionValidation) {
    return this.http.get(
      `${environment.apiBaseUrl}/session-links/${
        sessionValidation.sessionLink
      }`,
      { params: { accessCode: sessionValidation.accessCode } }
    );
  }

  checkParticipant(uid: string, sessionLink: string) {
    return this.afs
      .collection('public/data/sessions')
      .doc<ScopingSession>(sessionLink)
      .valueChanges()
      .map(session => !!session.participants[uid]);
  }
}
