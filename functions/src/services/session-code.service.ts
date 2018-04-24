import { Firestore } from "@google-cloud/firestore";

// Shuffled alphanumerics w/o vowels and ambiguous I, l, 1, 0, O, o.
const CHARS = 'vdR8gYZ43DpNJPQkBnWXGtysHfF7z2x-Mjh9bK6Tr5c_wVLCSqm';
const BASE = CHARS.length;

export class SessionCodeService {
  sessionsRef = this.firestore.doc('/public/sessions');
  linksRef = this.sessionsRef.collection('/links');

  constructor(private firestore: Firestore) {}

  async generateCode(userId, connectionId, projectId, sessionId) {
    const newId = await this.firestore.runTransaction(t => {
      return t.get(this.sessionsRef)
        .then(doc => {
          let fn, count;
          let increment = Math.floor(Math.random() * 128) + 32;

          if (!doc.exists) {
            fn = 'create';
            count = 1000000 + increment;
          } else {
            fn = 'update';
            count = doc.data().count + increment;
          }

          t[fn](this.sessionsRef, { count })

          return Promise.resolve(count);
        });
    });

    await this.linksRef.doc(`${newId}`).set({
      userId,
      connectionId,
      projectId,
      sessionId,
    });

    return this.encode(newId);
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
  decode(str: string) {
    let id = 0;

    for (let i = 0, len = str.length; i < len; i++) {
      id = (id * BASE) + CHARS.indexOf(str.charAt(i));
    }

    return id;
  }
}
