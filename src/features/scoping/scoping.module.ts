import { NgModule, ModuleWithProviders } from "@angular/core";

import { EffectsModule } from "@ngrx/effects";
import { SharedModule } from "../../shared/shared.module";
import { SessionAccessComponent } from "./components/session-access/session-access.component";
import { CountedVotesComponent } from "./components/counted-votes/counted-votes.component";
import { TaskCardComponent } from "./components/task-card/task-card.component";
import { SessionHeaderComponent } from "./components/session-header/session-header.component";
import { VoteComponent } from "./components/vote/vote.component";
import { ResultEstimateComponent } from "./components/result-estimate/result-estimate.component";
import { SelectResultComponent } from "./components/select-result/select-result.component";
import { ScopingFacade } from "./store/scoping.facade";
import { StoreModule } from "@ngrx/store";
import { scopingReducer } from "./store/scoping.reducer";
import { ScopingService } from "./services/scoping.service";

@NgModule({
  imports: [
    SharedModule,
    StoreModule.forFeature("scoping", scopingReducer),
    EffectsModule.forFeature([ScopingFacade])
  ],
  declarations: [
    CountedVotesComponent,
    ResultEstimateComponent,
    SelectResultComponent,
    SessionAccessComponent,
    SessionHeaderComponent,
    TaskCardComponent,
    VoteComponent
  ],
  entryComponents: [],
  exports: [
    ResultEstimateComponent,
    SessionHeaderComponent,
    SessionAccessComponent,
    TaskCardComponent,
    VoteComponent,
    SelectResultComponent,
    CountedVotesComponent
  ]
})
export class ScopingModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ScopingModule,
      providers: [ScopingFacade, ScopingService]
    };
  }
}
