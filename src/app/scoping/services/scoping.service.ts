import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@env/environment';
import { switchMap, map, catchError } from 'rxjs/operators';
import { SessionValidation, ScopingSession } from '@models/scoping-session';
import { AppFacade } from '@app/state/app.facade';
import { AngularFirestore } from 'angularfire2/firestore';

import * as firebase from 'firebase';
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

  vote(payload): Promise<any> {
    const {
      userId,
      moderatorId,
      connectionId,
      sessionId,
      taskId,
      estimate,
    } = payload;
    const taskRef = this.afs.firestore.doc(
      '/users/' +
        moderatorId +
        '/connections/' +
        connectionId +
        '/sessions/' +
        sessionId +
        '/tasks/' +
        taskId
    );
    return taskRef.get().then(taskDoc => {
      // Get the doc data and the votes from it, insert the user estimate with users Id
      const task = taskDoc.data();
      let votes = task.votes;
      if (!votes) {
        votes = {};
      }
      votes[userId] = estimate;

      // Only update votes attribute. We have a firestore rule that restricts updating to one attribute
      return taskRef.update({
        votes: votes,
      });
    });
  }

  checkParticipant(uid: string, sessionLink: string) {
    return this.afs
      .collection('public/data/sessions')
      .doc<ScopingSession>(sessionLink)
      .valueChanges()
      .map(session => !!session.participants[uid]);
  }
}
