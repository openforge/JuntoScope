import { Component, OnInit } from "@angular/core";
import { Platform } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
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
    authFacade: AuthEffects
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      authFacade.checkAuth();
    });
  }
}
