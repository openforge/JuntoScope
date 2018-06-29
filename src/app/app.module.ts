import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
// import { HttpClientModule } from '@angular/common/http';
// import { HttpModule } from '@angular/http';

import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";

import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { reducers, initialState, metaReducers } from "../store/app.reducer";
import { AppFacade } from "../store/app.facade";

import { AngularFireModule } from "angularfire2";
import { AngularFireAuthModule } from "angularfire2/auth";
import { AngularFirestoreModule } from "angularfire2/firestore";

import { environment } from "../environment";
import { JuntoScopeComponent } from "./app.component";
import { AuthenticationModule } from "../features/authentication/authentication.module";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [JuntoScopeComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(JuntoScopeComponent, { preloadModules: true }),
    StoreModule.forRoot(reducers, { metaReducers, initialState }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AuthenticationModule,
    SharedModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [JuntoScopeComponent],
  providers: [
    AppFacade,
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}
