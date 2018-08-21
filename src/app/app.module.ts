import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";

import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
import { Facebook } from "@ionic-native/facebook";
import { GooglePlus } from "@ionic-native/google-plus";
import { TwitterConnect } from "@ionic-native/twitter-connect";
import { ScreenOrientation } from "@ionic-native/screen-orientation";
import { InAppBrowser } from "@ionic-native/in-app-browser";

import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { EffectsModule } from "@ngrx/effects";
import { AngularFireModule } from "angularfire2";
import { AngularFireAuthModule } from "angularfire2/auth";
import { AngularFirestoreModule } from "angularfire2/firestore";

import { AppFacade } from "../store/app.facade";
import { environment } from "../environments/environment";

import { JuntoScopeComponent } from "./app.component";
import { SharedModule } from "../shared/shared.module";
import { AuthenticationModule } from "../features/authentication/authentication.module";
import { NotFoundComponent } from "./not-found.component";
import { DashboardModule } from "../features/dashboard/dashboard.module";
import { HttpClientModule } from "@angular/common/http";
import { HttpModule } from "@angular/http";
import { AuthGuard } from "./auth.guard";
import { AppRoutingModule } from "./app-routing.module";
import { ConnectionsModule } from "../features/connections/connections.module";
import { ScopingModule } from "../features/scoping/scoping.module";
import { SettingsModule } from "../features/settings/settings.module";

@NgModule({
  declarations: [JuntoScopeComponent, NotFoundComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    IonicModule.forRoot(JuntoScopeComponent, { preloadModules: true }),
    AppRoutingModule.forRoot(),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AuthenticationModule.forRoot(),
    ConnectionsModule.forRoot(),
    DashboardModule.forRoot(),
    ConnectionsModule.forRoot(),
    ScopingModule.forRoot(),
    SettingsModule.forRoot(),
    SharedModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [JuntoScopeComponent],
  providers: [
    HttpClientModule,
    Facebook,
    AppFacade,
    AuthGuard,
    StatusBar,
    SplashScreen,
    GooglePlus,
    ScreenOrientation,
    TwitterConnect,
    InAppBrowser,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}
