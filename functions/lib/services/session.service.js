"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// Shuffled alphanumerics w/o vowels and ambiguous I, l, 1, 0, O, o.
const CHARS = 'vdR8gYZ43DpNJPQkBnWXGtysHfF7z2x-Mjh9bK6Tr5c_wVLCSqm';
const BASE = CHARS.length;
const ACCESS_CODE_DURATION = 30 * 60000; // 30 minutes (in milliseconds)
class SessionService {
    constructor(firestore) {
        this.firestore = firestore;
        this.publicDataDocRef = this.firestore.doc('/public/data');
        this.publicSessionsRef = this.publicDataDocRef.collection('/sessions');
    }
    createSession(ownerId, connectionId, projectId, sessionTasks) {
        return __awaiter(this, void 0, void 0, function* () {
            const { accessCode, expirationDate } = this.generateAccessCode();
            const sessionDocRef = this.firestore
                .collection(`/users/${ownerId}/connections/${connectionId}/sessions`)
                .doc();
            const sessionTasksRef = sessionDocRef.collection('/tasks');
            const sessionCode = yield this.firestore.runTransaction((transaction) => __awaiter(this, void 0, void 0, function* () {
                const sessionUrlCode = yield transaction
                    .get(this.publicDataDocRef)
                    .then(publicSessionsDoc => {
                    // TODO: Use and update a distrbuted counter to minimize any potential impact on performance.
                    // See https://firebase.google.com/docs/firestore/solutions/counters
                    let fn, uniqueNum;
                    const increment = Math.floor(Math.random() * 128) + 32;
                    if (!publicSessionsDoc.exists) {
                        fn = 'create';
                        uniqueNum = 1000000 + increment;
                    }
                    else {
                        fn = 'update';
                        uniqueNum = publicSessionsDoc.data().uniqueNum + increment;
                    }
                    transaction[fn](this.publicDataDocRef, { uniqueNum });
                    return Promise.resolve(this.encode(uniqueNum));
                });
                const taskIds = Object.keys(sessionTasks);
                taskIds.forEach(taskId => {
                    transaction = transaction.set(sessionTasksRef.doc(taskId), sessionTasks[taskId]);
                });
                yield transaction
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
            }));
            return { sessionCode, accessCode };
        });
    }
    refreshAccessCode(sessionLink, uid) {
        return __awaiter(this, void 0, void 0, function* () {
            const publicSessionDocRef = this.publicSessionsRef.doc(sessionLink);
            yield publicSessionDocRef.get().then(doc => {
                const docData = doc.data();
                if (!docData) {
                    return Promise.reject('Invalid Session Link.');
                }
                if (docData.ownerId !== uid) {
                    return Promise.reject('Only a moderator can refresh the Access Code.');
                }
                const { ownerId, connectionId, sessionId } = docData;
                const sessionDocRef = this.firestore.doc(`/users/${ownerId}/connections/${connectionId}/sessions/${sessionId}`);
                const expirationDate = Date.now() + ACCESS_CODE_DURATION;
                return sessionDocRef.update({ expirationDate });
            });
        });
    }
    validateSession(sessionLink, providedAccessCode, uid) {
        return __awaiter(this, void 0, void 0, function* () {
            const nowTimestamp = Date.now();
            const publicSessionDocRef = this.publicSessionsRef.doc(sessionLink);
            return yield publicSessionDocRef
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
                    .doc(`/users/${ownerId}/connections/${connectionId}/sessions/${sessionId}`)
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
        });
    }
    deleteSession(uid, sessionLink) {
        return __awaiter(this, void 0, void 0, function* () {
            const publicSessionDocRef = this.publicSessionsRef.doc(sessionLink);
            return yield publicSessionDocRef.get().then(doc => {
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
                batch.delete(this.firestore.doc(`/users/${ownerId}/connections/${connectionId}/sessions/${sessionId}`));
                return batch.commit();
            });
        });
    }
    generateAccessCode() {
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const expirationDate = Date.now() + ACCESS_CODE_DURATION;
        let accessCode = '';
        for (let i = 0; i < 5; i++) {
            accessCode += letters.charAt(Math.floor(Math.random() * letters.length));
        }
        return { accessCode, expirationDate };
    }
    // Bijective Enumeration -- Number to String
    encode(id) {
        let encoded = '';
        while (id > 0) {
            encoded = CHARS.charAt(id % BASE) + encoded;
            id = Math.floor(id / BASE);
        }
        return encoded;
    }
    // Bijective Enumeration -- String to Number
    decode(str) {
        let id = 0;
        for (let i = 0, len = str.length; i < len; i++) {
            id = id * BASE + CHARS.indexOf(str.charAt(i));
        }
        return id;
    }
}
exports.SessionService = SessionService;
//# sourceMappingURL=session.service.js.map