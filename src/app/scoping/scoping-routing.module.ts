import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SessionScopingComponent } from '@app/scoping/containers/session-scoping/session-scoping.component';

const routes: Routes = [
  {
    path: ':sessionId',
    component: SessionScopingComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScopingRoutingModule {}
