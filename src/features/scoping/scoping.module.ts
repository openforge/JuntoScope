import { NgModule, ModuleWithProviders } from "@angular/core";

import { EffectsModule } from "@ngrx/effects";
import { SharedModule } from "../../shared/shared.module";
import { SessionScopingComponent } from "./pages/session-scoping/session-scoping.component";
import { SessionResultsComponent } from "./pages/session-results/session-results.component";
import { SessionAccessComponent } from "./components/session-access/session-access.component";
import { CountedVotesComponent } from "./components/counted-votes/counted-votes.component";
import { TaskCardComponent } from "./components/task-card/task-card.component";
import { SessionHeaderComponent } from "./components/session-header/session-header.component";
import { VoteComponent } from "./components/vote/vote.component";
import { ResultEstimateComponent } from "./components/result-estimate/result-estimate.component";
import { SelectResultComponent } from "./components/select-result/select-result.component";
import { TaskResultsComponent } from "./pages/task-results/task-results.component";
import { ScopingService } from "./services/scoping.service";
import { ScopingFacade } from "./store/scoping.facade";
import { StoreModule } from "@ngrx/store";
import { scopingReducer } from "./store/scoping.reducer";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "ionic-angular";

@NgModule({
  imports: [
    IonicModule,
    SharedModule,
    StoreModule.forFeature("scoping", scopingReducer),
    EffectsModule.forFeature([ScopingFacade]),
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    SessionAccessComponent,
    SessionScopingComponent,
    // SessionResultsComponent,
    CountedVotesComponent,
    TaskCardComponent,
    SessionHeaderComponent,
    VoteComponent,
    ResultEstimateComponent,
    SelectResultComponent,
    TaskResultsComponent
  ],
  entryComponents: []
})
export class ScopingModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ScopingModule,
      providers: []
    };
  }
}
