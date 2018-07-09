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
import { SettingsModule } from "../features/settings/settings.module";

import { AuthService } from "../features/authentication/services/auth.service";

import { AuthEffects } from "../features/authentication/store/auth.effects";
import { AppRoutingModule } from "./app-routing.module";
import { NotFoundComponent } from "./not-found.component";
import { LoginPageModule } from "../features/authentication/pages/login/login.module";

@NgModule({
  declarations: [JuntoScopeComponent, NotFoundComponent],
  imports: [
    BrowserModule,
    LoginPageModule,
    IonicModule.forRoot(JuntoScopeComponent, { preloadModules: true }),
    AppRoutingModule.forRoot(),
    StoreModule.forRoot(reducers, { metaReducers, initialState }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([AuthEffects]),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AuthenticationModule,
    SharedModule,
    SettingsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [JuntoScopeComponent],
  providers: [
    AppEffects,
    AuthService,
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}
