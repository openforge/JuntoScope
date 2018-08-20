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

  providerUsed;

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
          this.providerUsed = "google";
          return this.nativeGoogleLogin();
        } else {
          return this.afAuth.auth.signInWithPopup(this.googleProvider);
        }
      case "facebook":
        if (this.plt.is("cordova")) {
          this.providerUsed = "facebook";
          return this.nativeFacebookLogin();
        } else {
          return this.afAuth.auth.signInWithPopup(this.facebookProvider);
        }
      case "twitter":
        if (this.plt.is("cordova")) {
          this.providerUsed = "twitter";
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

  async logout() {
    switch (this.providerUsed) {
      case "google":
        await this.gplus.logout();
        break;
      case "facebook":
        await this.facebook.logout();
        break;
      case "twitter":
        await this.twitter.logout();
        break;
      default:
        break;
    }
    return this.afAuth.auth.signOut();
  }

  async nativeGoogleLogin(): Promise<void> {
    return await this.gplus.login({
      webClientId: environment.webClientId,
      offline: true,
      scopes: "profile email"
    }).then((response) => {
      return this.afAuth.auth.signInWithCredential(
        firebase.auth.GoogleAuthProvider.credential(response.idToken)
      )
    })
    .catch(() => { throw new Error("An error occured. Please try again.") });
  }

  async nativeTwitterLogin(): Promise<void> {
    return await this.twitter.login()
    .then((response) => {
      return this.afAuth.auth.signInWithCredential(
        firebase.auth.TwitterAuthProvider.credential(
          response.token,
          response.secret
        )
      )
    })
    .catch(() => { throw new Error("An error occurred. Please try again.") });
  }

  async nativeFacebookLogin(): Promise<void> {
   return await this.facebook.login([
      "email",
      "public_profile"
    ]).catch(() => { throw new Error("An error occurred. Please try again.") })

    .then((response) => {
      return this.afAuth.auth.signInWithCredential(
        firebase.auth.FacebookAuthProvider.credential(
          response.authResponse.accessToken
        )
      )
    })
  }
}
