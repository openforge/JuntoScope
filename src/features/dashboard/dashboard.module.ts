import { NgModule, ModuleWithProviders } from "@angular/core";

import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

// import { SharedModule } from '@app/shared/shared.module';
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { JoinSessionComponent } from "./components/join-session/join-session.component";
import { SessionHistoryListComponent } from "./components/session-history-list/session-history-list.component";
import { SessionHistoryItemComponent } from "./components/session-history-item/session-history-item.component";
import { SessionDetailModalComponent } from "./components/session-detail-modal/session-detail-modal.component";
import { HistoryService } from "./services/history.service";
import { dashboardReducer } from "./store/dashboard.reducer";
import { DashboardEffects } from "./store/dashboard.effects";
import { ConnectionsModule } from "../connections/connections.module";
import { SharedModule } from "../../shared/shared.module";
import { IonicModule } from "ionic-angular";

@NgModule({
  imports: [
    DashboardRoutingModule,
    IonicModule,
    StoreModule.forFeature("dashboard", dashboardReducer),
    EffectsModule.forFeature([DashboardEffects]),
    SharedModule,
    ConnectionsModule
  ],
  declarations: [
    DashboardComponent,
    JoinSessionComponent,
    SessionHistoryListComponent,
    SessionHistoryItemComponent,
    SessionDetailModalComponent
  ],
  entryComponents: [DashboardComponent]
})
export class DashboardModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: DashboardModule,
      providers: [HistoryService, DashboardEffects]
    };
  }
}
