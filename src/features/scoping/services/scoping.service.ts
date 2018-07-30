import { Injectable } from "@angular/core";
import * as firebase from "firebase";
import { HttpClient } from "@angular/common/http";

import { environment } from "../../../environment";
import { switchMap, map, catchError, take } from "rxjs/operators";
import {
  SessionValidation,
  ScopingSession
} from "../../../models/scoping-session";

import { AngularFirestore } from "angularfire2/firestore";
import { HistoryService } from "../../dashboard/services/history.service";
import { AppEffects } from "../../../store/app.effects";

@Injectable()
export class ScopingService {
  constructor(
    private afs: AngularFirestore,
    private appFacade: AppEffects,
    private historySvc: HistoryService,
    private http: HttpClient
  ) {}

  getSession(sessionCode) {
    // HERE IS THE ISSUE
    return this.afs
      .doc<ScopingSession>(`/public/data/sessions/${sessionCode}`)
      .valueChanges()
      .pipe(
        take(1),
        switchMap(session => {
          return this.historySvc
            .getSession({
              ownerId: session.ownerId,
              connectionId: session.connectionId,
              sessionId: session.sessionId
            })
            .pipe(
              map(usersSession => {
                return {
                  ...session,
                  ...usersSession
                };
              })
            );
        })
      );
  }

  vote(payload): Promise<any> {
    const {
      userId,
      moderatorId,
      connectionId,
      sessionId,
      taskId,
      estimate
    } = payload;
    const taskRef = this.afs.firestore.doc(
      "/users/" +
        moderatorId +
        "/connections/" +
        connectionId +
        "/sessions/" +
        sessionId +
        "/tasks/" +
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
        votes: votes
      });
    });
  }

  // setEstimate(payload): Promise<any> {
  //   const {
  //     userId,
  //     moderatorId,
  //     connectionId,
  //     sessionId,
  //     taskId,
  //     estimate
  //   } = payload;
  //   const taskRef = this.afs.firestore.doc(
  //     "/users/" +
  //       moderatorId +
  //       "/connections/" +
  //       connectionId +
  //       "/sessions/" +
  //       sessionId +
  //       "/tasks/" +
  //       taskId
  //   );
  //   // Only update estimate attribute.
  //   return taskRef.update({
  //     estimate: estimate
  //   });
  // }

  setEstimate(payload) {
    const {
      userId,
      moderatorId,
      connectionId,
      sessionId,
      taskId,
      estimate
    } = payload;

    return this.http.put(
      `${
        environment.apiBaseUrl
      }/estimate/${moderatorId}/connections/${connectionId}/sessions/${sessionId}/tasks/${taskId}`,
      { estimate: estimate }
    );
  }

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
      .collection("public/data/sessions")
      .doc<ScopingSession>(sessionLink)
      .valueChanges()
      .map(session => !!session.participants[uid]);
  }
}
