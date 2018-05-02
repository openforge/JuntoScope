import { NgModule, ModuleWithProviders } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '@app/shared/shared.module';
import { DashboardRoutingModule } from '@app/dashboard/dashboard-routing.module';
import { DashboardComponent } from '@app/dashboard/container/dashboard/dashboard.component';
import { JoinSessionComponent } from '@app/dashboard/components/join-session/join-session.component';
import { SessionHistoryComponent } from '@app/dashboard/components/session-history/session-history.component';
import { HistoryService } from '@app/dashboard/services/history.service';
import { dashboardReducer } from '@app/dashboard/state/dashboard.reducer';
import { DashboardFacade } from '@app/dashboard/state/dashboard.facade';

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
    SessionHistoryComponent,
  ],
})
export class DashboardModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: DashboardModule,
      providers: [HistoryService, DashboardFacade],
    };
  }
}
