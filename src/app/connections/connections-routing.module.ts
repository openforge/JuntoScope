import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddConnectionComponent } from '@app/connections/containers/add-connection/add-connection.component';
import { ConnectionDetailsComponent } from '@app/connections/containers/connection-details/connection-details.component';
import { SelectProjectComponent } from '@app/connections/containers/select-project/select-project.component';
import { SelectTaskListComponent } from '@app/connections/containers/select-task-list/select-task-list.component';

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
    path: ':connectionId/projects',
    component: SelectProjectComponent,
  },
  {
    path: ':connectionId/projects/:projectId',
    component: SelectTaskListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConnectionsRoutingModule {}
