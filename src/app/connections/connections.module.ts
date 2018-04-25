import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ConnectionsRoutingModule } from '@app/connections/connections-routing.module';
import { ConnectComponent } from '@app/connections/containers/connect/connect.component';
import { TeamworkComponent } from '@app/connections/containers/teamwork/teamwork.component';
import { InstructionsComponent } from '@app/connections/components/instructions/instructions.component';
import { StoreModule } from '@ngrx/store';
import { connectionReducer } from '@app/connections/state/connection.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ConnectionFacade } from '@app/connections/state/connection.facade';
import { ConnectionService } from '@app/connections/services/connection.service';

@NgModule({
  imports: [
    CommonModule,
    ConnectionsRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature('connection', connectionReducer),
    EffectsModule.forFeature([ConnectionFacade]),
  ],
  declarations: [ConnectComponent, TeamworkComponent, InstructionsComponent],
})
export class ConnectionsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ConnectionsModule,
      providers: [ConnectionService, ConnectionFacade],
    };
  }
}
