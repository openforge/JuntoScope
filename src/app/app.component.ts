import { Component } from "@angular/core";
import { Platform } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { ScreenOrientation } from "@ionic-native/screen-orientation";
import { SplashScreen } from "@ionic-native/splash-screen";
import { AuthFacade } from "../features/authentication/store/auth.facade";
import { Deeplinks } from "@ionic-native/deeplinks";
import { DashboardPage } from "../features/dashboard/pages/dashboard/dashboard.component";

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
    authFacade: AuthFacade,
    deeplinks: Deeplinks
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

      deeplinks
        .route({
          "/": DashboardPage
        })
        .subscribe(
          match => {
            // match.$route - the route we matched, which is the matched entry from the arguments to route()
            // match.$args - the args passed in the link
            // match.$link - the full link data
            console.log("Successfully matched route", match);
          },
          nomatch => {
            // nomatch.$link - the full link data
            console.error("Got a deeplink that didn't match", nomatch);
          }
        );
    });
  }
}
