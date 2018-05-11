import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SessionScopingComponent } from '@app/scoping/containers/session-scoping/session-scoping.component';
import { SessionResultsComponent } from '@app/scoping/containers/session-results/session-results.component';
import { TaskResultsComponent } from '@app/scoping/containers/task-results/task-results.component';

const routes: Routes = [
  {
    path: ':sessionCode',
    component: SessionScopingComponent,
  },
  {
    path: ':sessionCode/results',
    component: SessionResultsComponent,
  },
  {
    path: ':sessionCode/tasks/:taskId/results',
    component: TaskResultsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScopingRoutingModule {}
