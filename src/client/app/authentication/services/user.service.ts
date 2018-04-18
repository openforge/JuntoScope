import { Injectable } from '@angular/core';

import { map, tap } from 'rxjs/operators';

import {
  AngularFirestore,
  AngularFirestoreCollection,
} from 'angularfire2/firestore';

import * as firebase from 'firebase';

export interface User {
  name: string;
  projects: object[];
  uid: number;
}

@Injectable()
export class UserService {
  private usersCollection: AngularFirestoreCollection<User>;

  constructor(private afs: AngularFirestore) {
    this.usersCollection = afs.collection<User>('users');
  }

  processUser(user) {
    this.afs.firestore
      .doc('/users/' + user.uid)
      .get()
      .then(docSnapshot => {
        if (docSnapshot.exists) {
          console.log('User already exists');
        } else {
          this.addUser(user);
        }
      });
  }

  addUser(user) {
    this.usersCollection.doc(user.uid).set({
      sources: [],
    });
  }
}
