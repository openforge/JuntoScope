import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { EffectsModule } from "@ngrx/effects";
import { AngularFireModule } from "angularfire2";
import { AngularFireAuthModule } from "angularfire2/auth";
import { AngularFirestoreModule } from "angularfire2/firestore";
import { reducers, initialState, metaReducers } from "../store/app.reducer";
import { AppEffects } from "../store/app.effects";
import { environment } from "../environment";
import { JuntoScopeComponent } from "./app.component";
import { SharedModule } from "../shared/shared.module";
import { AuthenticationModule } from "../features/authentication/authentication.module";
import { AuthEffects } from "../features/authentication/store/auth.effects";
import { NotFoundComponent } from "./not-found.component";
import { DashboardModule } from "../features/dashboard/dashboard.module";
import { HttpClientModule } from "@angular/common/http";
import { AuthGuard } from "./auth.guard";
import { AppRoutingModule } from "./app-routing.module";
import { ConnectionsModule } from "../features/connections/connections.module";
import { GooglePlus } from "@ionic-native/google-plus";
import { ScreenOrientation } from "@ionic-native/screen-orientation";
import { ScopingModule } from "../features/scoping/scoping.module";
import { SettingsModule } from "../features/settings/settings.module";

@NgModule({
  declarations: [JuntoScopeComponent, NotFoundComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(JuntoScopeComponent, { preloadModules: true }),
    AppRoutingModule.forRoot(),
    StoreModule.forRoot(reducers, { metaReducers, initialState }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([AuthEffects]),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AuthenticationModule.forRoot(),
    ConnectionsModule.forRoot(),
    DashboardModule.forRoot(),
    ConnectionsModule.forRoot(),
    ScopingModule.forRoot(),
    SettingsModule,
    SharedModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [JuntoScopeComponent],
  providers: [
    AppEffects,
    AuthGuard,
    StatusBar,
    SplashScreen,
    GooglePlus,
    ScreenOrientation,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}
