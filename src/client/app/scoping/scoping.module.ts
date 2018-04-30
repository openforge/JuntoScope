import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';
import { ScopingRoutingModule } from '@app/scoping/scoping-routing.module';
import { SessionScopingComponent } from '@app/scoping/containers/session-scoping/session-scoping.component';
import { SessionResultsComponent } from '@app/scoping/containers/session-results/session-results.component';

@NgModule({
  imports: [SharedModule, ScopingRoutingModule],
  declarations: [SessionScopingComponent, SessionResultsComponent],
})
export class ScopingModule {}
