import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddConnectionComponent } from '@app/connections/containers/add-connection/add-connection.component';
import { CreateSessionComponent } from '@app/connections/containers/create-session/create-session.component';
import { ConnectionDetailsComponent } from '@app/connections/containers/connection-details/connection-details.component';

const routes: Routes = [
  {
    path: 'add',
    component: AddConnectionComponent,
  },
  {
    path: ':connectionId',
    component: ConnectionDetailsComponent,
  },
  {
    path: ':connectionId/create-session',
    component: CreateSessionComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConnectionsRoutingModule {}
