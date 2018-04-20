import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConnectComponent } from './containers/connect/connect.component';
import { TeamworkComponent } from './containers/teamwork/teamwork.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'connect',
  },
  {
    path: 'connect',
    component: ConnectComponent,
  },
  {
    path: 'teamwork',
    component: TeamworkComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConnectionsRoutingModule {}
