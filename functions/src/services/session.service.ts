import { Firestore } from '@google-cloud/firestore';
import { encryptionService } from '.';
import { deleteSession } from '../api/session-links/delete-session';

// Shuffled alphanumerics w/o vowels and ambiguous I, l, 1, 0, O, o.
const CHARS = 'vdR8gYZ43DpNJPQkBnWXGtysHfF7z2x-Mjh9bK6Tr5c_wVLCSqm';
const BASE = CHARS.length;

const ACCESS_CODE_DURATION = 30 * 60000; // 30 minutes (in milliseconds)

export class SessionService {
  publicDataDocRef = this.firestore.doc('/public/data');
  publicSessionsRef = this.publicDataDocRef.collection('/sessions');

  constructor(private firestore: Firestore) {}

  async createSession(ownerId, connectionId, projectId, sessionTasks) {
    const { accessCode, expirationDate } = this.generateAccessCode();

    const sessionDocRef = this.firestore
      .collection(`/users/${ownerId}/connections/${connectionId}/sessions`)
      .doc();
    const sessionTasksRef = sessionDocRef.collection('/tasks');

    const sessionCode = await this.firestore.runTransaction(
      async transaction => {
        const sessionUrlCode = await transaction
          .get(this.publicDataDocRef)
          .then(publicSessionsDoc => {
            // TODO: Use and update a distrbuted counter to minimize any potential impact on performance.
            // See https://firebase.google.com/docs/firestore/solutions/counters
            let fn: 'create' | 'update', uniqueNum;
            const increment = Math.floor(Math.random() * 128) + 32;

            if (!publicSessionsDoc.exists) {
              fn = 'create';
              uniqueNum = 1000000 + increment;
            } else {
              fn = 'update';
              uniqueNum = publicSessionsDoc.data().uniqueNum + increment;
            }

            transaction[fn](this.publicDataDocRef, { uniqueNum });

            return Promise.resolve(this.encode(uniqueNum));
          });

        const taskIds = Object.keys(sessionTasks);
        taskIds.forEach(taskId => {
          transaction = transaction.set(
            sessionTasksRef.doc(taskId),
            sessionTasks[taskId]
          );
        });

        await transaction
          .set(sessionDocRef, {
            sessionCode: sessionUrlCode,
            accessCode,
            expirationDate,
            currentTaskId: taskIds[0],
            numTasks: taskIds.length,
            numScopedTasks: 0,
          })
          .set(this.publicSessionsRef.doc(sessionUrlCode), {
            ownerId,
            connectionId,
            projectId,
            sessionId: sessionDocRef.id,
            participants: { [ownerId]: Date.now() },
          });

        return sessionUrlCode;
      }
    );

    return { sessionCode, accessCode };
  }

  async refreshAccessCode(sessionLink: string, uid: string) {
    const publicSessionDocRef = this.publicSessionsRef.doc(sessionLink);

    await publicSessionDocRef.get().then(doc => {
      const docData = doc.data();

      if (!docData) {
        return Promise.reject('Invalid Session Link.');
      }

      if (docData.ownerId !== uid) {
        return Promise.reject('Only a moderator can refresh the Access Code.');
      }

      const { ownerId, connectionId, sessionId } = docData;

      const sessionDocRef = this.firestore.doc(
        `/users/${ownerId}/connections/${connectionId}/sessions/${sessionId}`
      );

      const expirationDate = Date.now() + ACCESS_CODE_DURATION;
      return sessionDocRef.update({ expirationDate });
    });
  }

  async validateSession(
    sessionLink: string,
    providedAccessCode: string,
    uid: string
  ) {
    const nowTimestamp = Date.now();
    const publicSessionDocRef = this.publicSessionsRef.doc(sessionLink);

    return await publicSessionDocRef
      .get()
      .then(doc => {
        const docData = doc.data();

        if (!docData) {
          return Promise.reject('Invalid Session Link.');
        }

        if (docData.participants && docData.participants[uid]) {
          return Promise.reject('Already a participant of this session.');
        }

        const { ownerId, connectionId, sessionId } = docData;

        return this.firestore
          .doc(
            `/users/${ownerId}/connections/${connectionId}/sessions/${sessionId}`
          )
          .get();
      })
      .then(sessionDoc => {
        const { accessCode, expirationDate } = sessionDoc.data();

        if (providedAccessCode !== accessCode) {
          return Promise.reject('Invalid Access Code.');
        }

        if (expirationDate < nowTimestamp) {
          return Promise.reject('Access Code Expired.');
        }

        return publicSessionDocRef.update(`participants.${uid}`, nowTimestamp);
      });
  }

  async deleteSession(uid, sessionLink) {
    const publicSessionDocRef = this.publicSessionsRef.doc(sessionLink);

    return await publicSessionDocRef.get().then(doc => {
      const docData = doc.data();

      if (!docData) {
        return Promise.reject('Invalid Session Link.');
      }

      const { ownerId, connectionId, sessionId } = docData;

      if (uid !== ownerId) {
        return Promise.reject('You are no the owner of this session.');
      }

      const batch = this.firestore.batch();
      batch.delete(this.firestore.doc(`/public/data/sessions/${sessionLink}`));
      batch.delete(
        this.firestore.doc(
          `/users/${ownerId}/connections/${connectionId}/sessions/${sessionId}`
        )
      );
      return batch.commit();
    });
  }

  async setTaskEstimate(
    userId,
    ownerId,
    connectionId,
    sessionId,
    taskId,
    estimate
  ) {
    const sessionRef = this.firestore.doc(
      `/users/${ownerId}/connections/${connectionId}/sessions/${sessionId}`
    );
    const tasksRef = this.firestore.collection(
      `/users/${ownerId}/connections/${connectionId}/sessions/${sessionId}/tasks`
    );
    const taskRef = this.firestore.doc(
      `/users/${ownerId}/connections/${connectionId}/sessions/${sessionId}/tasks/${taskId}`
    );

    /**
     * 1. update estimate for the task
     * 2. get all the session's tasks
     * 3. update session attributes based on the task statuses etc
     */
    return taskRef
      .update({ estimate })
      .then(result => {
        return tasksRef
          .get()
          .then(tasksDoc => {
            const tasks = [];
            tasksDoc.forEach(function(doc) {
              tasks.push({ ...doc.data(), id: doc.id });
            });
            return sessionRef
              .get()
              .then(sessionDoc => {
                const session = sessionDoc.data();

                // Resolve the current scoped tasks count and next currentTaskId
                const scopedTasks = tasks.filter(t => t.estimate !== undefined);
                const scopedCount = scopedTasks ? scopedTasks.length : 0;
                const taskIndex = tasks.indexOf(taskId);
                let nextId;
                if (taskIndex < tasks.length - 1) {
                  const taskIds = Object.keys(tasks);
                  nextId = tasks[taskIndex + 1].id;
                } else {
                  nextId = session.currentTaskId;
                }

                session.numScopedTasks = scopedCount;
                session.currentTaskId = nextId;

                return sessionRef.update(session);
              })
              .catch(error => {
                throw new Error('Unable to update session. Try again later.');
              });
          })
          .catch(error => {
            throw new Error(
              'Unable to load tasks for the session. Try again later.'
            );
          });
      })
      .catch(error => {
        throw new Error('Unable to update the task. Try again later.');
      });
  }

  private generateAccessCode() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const expirationDate = Date.now() + ACCESS_CODE_DURATION;
    let accessCode = '';

    for (let i = 0; i < 5; i++) {
      accessCode += letters.charAt(Math.floor(Math.random() * letters.length));
    }

    return { accessCode, expirationDate };
  }

  // Bijective Enumeration -- Number to String
  private encode(id: number) {
    let encoded = '';

    while (id > 0) {
      encoded = CHARS.charAt(id % BASE) + encoded;
      id = Math.floor(id / BASE);
    }

    return encoded;
  }

  // Bijective Enumeration -- String to Number
  private decode(str: string) {
    let id = 0;

    for (let i = 0, len = str.length; i < len; i++) {
      id = id * BASE + CHARS.indexOf(str.charAt(i));
    }

    return id;
  }
}
