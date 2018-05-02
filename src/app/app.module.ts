import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { IonicModule } from '@ionic/angular';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { environment } from '@env/environment';
import { AppRoutingModule } from '@app/app-routing.module';
import { SharedModule } from '@app/shared/shared.module';
import { AuthenticationModule } from '@app/authentication/authentication.module';
import { ConnectionsModule } from '@app/connections/connections.module';
import { AppComponent } from '@app/app.component';
import { NotFoundComponent } from '@app/not-found.component';
import { AuthGuard } from '@app/auth.guard';
import { UnAuthGuard } from '@app/un-auth.guard';
import { AppFacade } from '@app/state/app.facade';
import { reducers, metaReducers, initialState } from '@app/state/app.reducer';
import { DashboardModule } from '@app/dashboard/dashboard.module';

@NgModule({
  declarations: [AppComponent, NotFoundComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule.forRoot(),
    StoreModule.forRoot(reducers, { metaReducers, initialState }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    SharedModule.forRoot(),
    AuthenticationModule.forRoot(),
    DashboardModule.forRoot(),
    ConnectionsModule.forRoot(),
  ],
  providers: [AppFacade, AuthGuard, UnAuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
