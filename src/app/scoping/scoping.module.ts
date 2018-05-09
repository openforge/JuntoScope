import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';
import { ScopingRoutingModule } from '@app/scoping/scoping-routing.module';
import { SessionScopingComponent } from '@app/scoping/containers/session-scoping/session-scoping.component';
import { SessionResultsComponent } from '@app/scoping/containers/session-results/session-results.component';
import { CountedVotesComponent } from './components/counted-votes/counted-votes.component';
import { TaskCardComponent } from './components/task-card/task-card.component';
import { SessionHeaderComponent } from './components/session-header/session-header.component';
import { VoteComponent } from './components/vote/vote.component';
import { ResultEstimateComponent } from './components/result-estimate/result-estimate.component';

@NgModule({
  imports: [SharedModule, ScopingRoutingModule],
  declarations: [
    SessionScopingComponent,
    SessionResultsComponent,
    CountedVotesComponent,
    TaskCardComponent,
    SessionHeaderComponent,
    VoteComponent,
    ResultEstimateComponent,
  ],
})
export class ScopingModule {}
