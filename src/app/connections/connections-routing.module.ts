import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConnectComponent } from '@app/connections/containers/connect/connect.component';
import { TeamworkComponent } from '@app/connections/containers/teamwork/teamwork.component';
import { CreateSessionComponent } from '@app/connections/containers/create-session/create-session.component';
import { ConnectionDetailsComponent } from '@app/connections/containers/connection-details/connection-details.component';

const routes: Routes = [
  {
    path: '',
    component: ConnectComponent,
  },
  {
    path: 'teamwork',
    component: TeamworkComponent,
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
