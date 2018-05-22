import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ConnectionsRoutingModule } from '@app/connections/connections-routing.module';
import { ConnectComponent } from '@app/connections/containers/connect/connect.component';
import { TeamworkComponent } from '@app/connections/containers/teamwork/teamwork.component';
import { InstructionsComponent } from '@app/connections/components/instructions/instructions.component';

@NgModule({
  imports: [
    CommonModule,
    ConnectionsRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  declarations: [ConnectComponent, TeamworkComponent, InstructionsComponent],
})
export class ConnectionsModule {}
