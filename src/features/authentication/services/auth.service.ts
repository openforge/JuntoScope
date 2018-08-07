import { Injectable } from "@angular/core";

import { AngularFireAuth } from "angularfire2/auth";

import { map } from "rxjs/operators";

import * as firebase from "firebase";

import { User } from "../../../models/user";

import { Platform } from "ionic-angular";
import { GooglePlus } from "@ionic-native/google-plus";
import { Facebook } from "@ionic-native/facebook";

@Injectable()
export class AuthService {
  private googleProvider = new firebase.auth.GoogleAuthProvider();
  private facebookProvider = new firebase.auth.FacebookAuthProvider();
  private twitterProvider = new firebase.auth.TwitterAuthProvider();

  constructor(
    private afAuth: AngularFireAuth,
    private plt: Platform,
    private gplus: GooglePlus,
    private facebook: Facebook
  ) {}

  login(provider) {
    switch (provider) {
      case "google":
        if (this.plt.is("cordova")) {
          return this.nativeGoogleLogin();
        } else {
          return this.afAuth.auth.signInWithPopup(this.googleProvider);
        }
      case "facebook":
        if (this.plt.is('cordova')) {
          return this.nativeFacebookLogin();
        } else {
          return this.afAuth.auth.signInWithPopup(this.facebookProvider);
        }
      case "twitter":
        return this.afAuth.auth.signInWithPopup(this.twitterProvider);
      default:
        return Promise.reject(Error("Unknown AuthProvider Passed"));
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

  async nativeGoogleLogin(): Promise<void> {
    const gplusUser = await this.gplus.login({
      webClientId:
        "494457695327-97un3fs0v2dpib0ep78ma1qocmvkph4q.apps.googleusercontent.com",
      offline: true,
      scopes: "profile email"
    });
    return await this.afAuth.auth.signInWithCredential(
      firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken)
    );
  }

  async nativeFacebookLogin(): Promise<void> {
    await this.facebook.login(['email', 'public_profile']).then(res => {
      const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
      return this.afAuth.auth.signInWithCredential(facebookCredential);
    })
  }
}
