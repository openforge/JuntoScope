import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConnectComponent } from './containers/connect/connect.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/connect',
  },
  {
    path: 'connect',
    component: ConnectComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConnectionsRoutingModule {}
