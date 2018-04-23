import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { reducers, metaReducers, initialState } from './state/app.state';
import { AppComponent } from './app.component';
import { AuthenticationModule } from './authentication/authentication.module';
import { NotFoundComponent } from './not-found.component';
import { AuthGuard } from './auth.guard';
import { UnAuthGuard } from './un-auth.guard';

@NgModule({
  declarations: [AppComponent, NotFoundComponent],
  imports: [
    BrowserModule,
    AppRoutingModule.forRoot(),
    StoreModule.forRoot(reducers, { metaReducers, initialState }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AuthenticationModule.forRoot(),
  ],
  providers: [AuthGuard, UnAuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
