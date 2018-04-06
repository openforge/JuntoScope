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
    if (this.afs.collection('users', ref => ref.where('uid', '==', user.uid))) {
      console.log('User already exists: ');
    } else {
      this.addUser(user);
    }
  }

  addUser(user) {
    this.usersCollection.add({
      name: user.displayName,
      projects: [],
      uid: user.uid,
    });
  }
}
