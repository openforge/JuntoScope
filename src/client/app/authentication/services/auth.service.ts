import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';

import { map, tap } from 'rxjs/operators';

import * as firebase from 'firebase';

import { User } from '../../../../models/user';

@Injectable()
export class AuthService {
  private googleProvider = new firebase.auth.GoogleAuthProvider();

  constructor(private afAuth: AngularFireAuth) {}

  login(provider = 'google') {
    switch (provider) {
      case 'google':
        return this.afAuth.auth.signInWithPopup(this.googleProvider);
      default:
        return Promise.reject(Error('Unknown AuthProvider Passed'));
    }
  }

  getUser() {
    return this.afAuth.authState.pipe(
      map(authData => {
        if (authData) {
          const { uid, displayName } = authData;
          return { uid, displayName } as User;
        }
        return null;
      })
    );
  }

  logout() {
    return this.afAuth.auth.signOut();
  }
}
