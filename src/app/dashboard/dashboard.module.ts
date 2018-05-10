import { NgModule, ModuleWithProviders } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '@app/shared/shared.module';
import { DashboardRoutingModule } from '@app/dashboard/dashboard-routing.module';
import { DashboardComponent } from '@app/dashboard/container/dashboard/dashboard.component';
import { JoinSessionComponent } from '@app/dashboard/components/join-session/join-session.component';
import { SessionHistoryListComponent } from '@app/dashboard/components/session-history-list/session-history-list.component';
import { SessionHistoryItemComponent } from './components/session-history-item/session-history-item.component';
import { HistoryService } from '@app/dashboard/services/history.service';
import { dashboardReducer } from '@app/dashboard/state/dashboard.reducer';
import { DashboardFacade } from '@app/dashboard/state/dashboard.facade';
import { CreateSessionComponent } from './components/create-session/create-session.component';
import { SessionDetailModalComponent } from '@app/dashboard/components/session-detail-modal/session-detail-modal.component';

@NgModule({
  imports: [
    DashboardRoutingModule,
    StoreModule.forFeature('dashboard', dashboardReducer),
    EffectsModule.forFeature([DashboardFacade]),
    SharedModule,
  ],
  declarations: [
    DashboardComponent,
    JoinSessionComponent,
    SessionHistoryListComponent,
    SessionHistoryItemComponent,
    CreateSessionComponent,
    SessionDetailModalComponent,
  ],
  entryComponents: [SessionDetailModalComponent],
})
export class DashboardModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: DashboardModule,
      providers: [HistoryService, DashboardFacade],
    };
  }
}
