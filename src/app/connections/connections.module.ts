import { NgModule, ModuleWithProviders } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '@app/shared/shared.module';
import { ConnectionsRoutingModule } from '@app/connections/connections-routing.module';
import { AddConnectionComponent } from '@app/connections/containers/add-connection/add-connection.component';
import { CreateSessionComponent } from '@app/connections/containers/create-session/create-session.component';
import { ConnectionDetailsComponent } from '@app/connections/containers/connection-details/connection-details.component';
import { InstructionsComponent } from '@app/connections/components/instructions/instructions.component';
import { connectionReducer } from '@app/connections/state/connection.reducer';
import { ConnectionFacade } from '@app/connections/state/connection.facade';
import { ConnectionService } from '@app/connections/services/connection.service';

@NgModule({
  imports: [
    ConnectionsRoutingModule,
    StoreModule.forFeature('connection', connectionReducer),
    EffectsModule.forFeature([ConnectionFacade]),
    SharedModule,
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
