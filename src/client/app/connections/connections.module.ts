import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConnectionsRoutingModule } from './connections-routing.module';
import { ConnectComponent } from './containers/connect/connect.component';
import { TeamworkComponent } from './containers/teamwork/teamwork.component';
import { InstructionsComponent } from './components/instructions/instructions.component';

@NgModule({
  imports: [CommonModule, ConnectionsRoutingModule],
  declarations: [ConnectComponent, TeamworkComponent, InstructionsComponent],
})
export class ConnectionsModule {}
