import { NgModule, ModuleWithProviders } from "@angular/core";

import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { HistoryService } from "./services/history.service";
import { dashboardReducer } from "./store/dashboard.reducer";
import { DashboardEffects } from "./store/dashboard.effects";
import { SharedModule } from "../../shared/shared.module";
import { SessionDetailModalComponent } from "./components/session-detail-modal/session-detail-modal.component";
import { JoinSessionComponent } from "./components/join-session/join-session.component";
import { SessionHistoryItemComponent } from "./components/session-history-item/session-history-item.component";
import { SessionHistoryListComponent } from "./components/session-history-list/session-history-list.component";

@NgModule({
  imports: [
    SharedModule,
    StoreModule.forFeature("dashboard", dashboardReducer),
    EffectsModule.forFeature([DashboardEffects])
  ],
  declarations: [
    JoinSessionComponent,
    SessionDetailModalComponent,
    SessionHistoryItemComponent,
    SessionHistoryListComponent
  ],
  entryComponents: [SessionDetailModalComponent],
  exports: [JoinSessionComponent, SessionHistoryListComponent]
})
export class DashboardModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: DashboardModule,
      providers: [DashboardEffects, HistoryService]
    };
  }
}
