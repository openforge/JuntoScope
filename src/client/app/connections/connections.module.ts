import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConnectionsRoutingModule } from './connections-routing.module';
import { ConnectComponent } from './containers/connect/connect.component';

@NgModule({
  imports: [CommonModule, ConnectionsRoutingModule],
  declarations: [ConnectComponent],
})
export class ConnectionsModule {}
