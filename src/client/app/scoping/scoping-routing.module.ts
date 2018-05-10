import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SessionScopingComponent } from '@app/scoping/containers/session-scoping/session-scoping.component';
import { SessionResultsComponent } from '@app/scoping/containers/session-results/session-results.component';
import { SessionAccessComponent } from '@app/scoping/containers/session-access/session-access.component';
import { TaskResultsComponent } from '@app/scoping/containers/task-results/task-results.component';

const routes: Routes = [
  {
    path: 'access/:sessionCode',
    component: SessionAccessComponent,
  },
  {
    path: ':sessionId',
    component: SessionScopingComponent,
  },
  {
    path: ':sessionId/results',
    component: SessionResultsComponent,
  },
  {
    path: ':sessionId/tasks/:taskId/results',
    component: TaskResultsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScopingRoutingModule {}
