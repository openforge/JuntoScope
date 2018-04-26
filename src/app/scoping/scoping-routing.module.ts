import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SessionScopingComponent } from '@app/scoping/containers/session-scoping/session-scoping.component';
import { SessionResultsComponent } from '@app/scoping/containers/session-results/session-results.component';

const routes: Routes = [
  {
    path: ':sessionId',
    component: SessionScopingComponent,
  },
  {
    path: ':sessionId/results',
    component: SessionResultsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScopingRoutingModule {}
