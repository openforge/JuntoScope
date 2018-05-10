import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable()
export class ScopingService {
  constructor(private afs: AngularFirestore) {}

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

  setEstimate(payload): Promise<any> {
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
    // Only update estimate attribute.
    return taskRef.update({
      estimate: estimate,
    });
  }
}
