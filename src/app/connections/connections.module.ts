import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ConnectionsRoutingModule } from '@app/connections/connections-routing.module';
import { AddConnectionComponent } from '@app/connections/containers/add-connection/add-connection.component';
import { InstructionsComponent } from '@app/connections/components/instructions/instructions.component';
import { StoreModule } from '@ngrx/store';
import { connectionReducer } from '@app/connections/state/connection.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ConnectionFacade } from '@app/connections/state/connection.facade';
import { ConnectionService } from '@app/connections/services/connection.service';
import { CreateSessionComponent } from '@app/connections/containers/create-session/create-session.component';
import { ConnectionDetailsComponent } from './containers/connection-details/connection-details.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [
    CommonModule,
    ConnectionsRoutingModule,
    IonicModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature('connection', connectionReducer),
    EffectsModule.forFeature([ConnectionFacade]),
  ],
  declarations: [
    AddConnectionComponent,
    InstructionsComponent,
    CreateSessionComponent,
    ConnectionDetailsComponent,
  ],
})
export class ConnectionsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ConnectionsModule,
      providers: [ConnectionService, ConnectionFacade],
    };
  }
}
