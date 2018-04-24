import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { environment } from '@env/environment';
import { AppRoutingModule } from '@app/app-routing.module';
import { reducers, metaReducers, initialState } from '@app/state/app.state';
import { AppComponent } from '@app/app.component';
import { AuthenticationModule } from '@app/authentication/authentication.module';
import { NotFoundComponent } from '@app/not-found.component';
import { AuthGuard } from '@app/auth.guard';
import { UnAuthGuard } from '@app/un-auth.guard';

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
