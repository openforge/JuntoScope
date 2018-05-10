import { NgModule, ModuleWithProviders } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';
import { ScopingRoutingModule } from '@app/scoping/scoping-routing.module';
import { SessionScopingComponent } from '@app/scoping/containers/session-scoping/session-scoping.component';
import { SessionResultsComponent } from '@app/scoping/containers/session-results/session-results.component';
import { SessionAccessComponent } from '@app/scoping/containers/session-access/session-access.component';
import { CountedVotesComponent } from './components/counted-votes/counted-votes.component';
import { TaskCardComponent } from './components/task-card/task-card.component';
import { SessionHeaderComponent } from './components/session-header/session-header.component';
import { VoteComponent } from './components/vote/vote.component';
import { ResultEstimateComponent } from './components/result-estimate/result-estimate.component';
import { ScopingService } from '@app/scoping/services/scoping.service';
import { ScopingFacade } from '@app/scoping/state/scoping.facade';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { scopingReducer } from '@app/scoping/state/scoping.reducer';

@NgModule({
  imports: [
    SharedModule,
    ScopingRoutingModule,
    StoreModule.forFeature('scoping', scopingReducer),
    EffectsModule.forFeature([ScopingFacade]),
  ],
  declarations: [
    SessionAccessComponent,
    SessionScopingComponent,
    SessionResultsComponent,
    SessionScopingComponent,
    SessionResultsComponent,
    CountedVotesComponent,
    TaskCardComponent,
    SessionHeaderComponent,
    VoteComponent,
    ResultEstimateComponent,
  ],
})
export class ScopingModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ScopingModule,
      providers: [ScopingService, ScopingFacade],
    };
  }
}
