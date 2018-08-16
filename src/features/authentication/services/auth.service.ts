import { Injectable } from "@angular/core";
import { AngularFireAuth } from "angularfire2/auth";
import { map } from "rxjs/operators";
import * as firebase from "firebase";
import { User } from "../../../models/user";
import { Platform } from "ionic-angular";
import { GooglePlus } from "@ionic-native/google-plus";
import { Facebook } from "@ionic-native/facebook";
import { TwitterConnect } from "@ionic-native/twitter-connect";
import { environment } from "../../../environments/environment";

@Injectable()
export class AuthService {
  private googleProvider = new firebase.auth.GoogleAuthProvider();
  private facebookProvider = new firebase.auth.FacebookAuthProvider();
  private twitterProvider = new firebase.auth.TwitterAuthProvider();

  constructor(
    private afAuth: AngularFireAuth,
    private plt: Platform,
    private gplus: GooglePlus,
    private facebook: Facebook,
    private twitter: TwitterConnect
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
        if (this.plt.is("cordova")) {
          return this.nativeFacebookLogin();
        } else {
          return this.afAuth.auth.signInWithPopup(this.facebookProvider);
        }
      case "twitter":
        if (this.plt.is("cordova")) {
          return this.nativeTwitterLogin();
        } else {
          return this.afAuth.auth.signInWithPopup(this.twitterProvider);
        }
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
      webClientId: environment.webClientId,
      offline: true,
      scopes: "profile email"
    });
    return await this.afAuth.auth.signInWithCredential(
      firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken)
    );
  }

    async nativeTwitterLogin(): Promise<void> {
    const response = await this.twitter.login();
    return await this.afAuth.auth.signInWithCredential(
      firebase.auth.TwitterAuthProvider.credential(
        response.token,
        response.secret
      )
    );
  }
  
  async nativeFacebookLogin(): Promise<void> {
    const facebookResponse = await this.facebook.login([
      "email",
      "public_profile"
    ]);
    return await this.afAuth.auth.signInWithCredential(
      firebase.auth.FacebookAuthProvider.credential(
        facebookResponse.authResponse.accessToken
      )
    );
  }
}
