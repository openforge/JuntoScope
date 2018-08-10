import { Component } from "@angular/core";
import { Platform } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { ScreenOrientation } from "@ionic-native/screen-orientation";
import { SplashScreen } from "@ionic-native/splash-screen";
import { AuthEffects } from "../features/authentication/store/auth.effects";

@Component({
  templateUrl: "app.html"
})
export class JuntoScopeComponent {
  rootPage: any = "LoginPage";

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    screenOrientation: ScreenOrientation,
    authFacade: AuthEffects
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      screenOrientation
        .lock(screenOrientation.ORIENTATIONS.PORTRAIT)
        .catch(error => console.log(error));

      authFacade.checkAuth();
    });
  }
}
