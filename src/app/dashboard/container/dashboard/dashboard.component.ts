import { Component, OnInit, OnDestroy } from '@angular/core';

import { TakeUntilDestroy, untilDestroyed } from 'ngx-take-until-destroy';

import { map, filter, withLatestFrom, take, tap } from 'rxjs/operators';

import { AppFacade } from '@app/state/app.facade';
import { RouterFacade } from '@app/state/router.facade';
import { DashboardFacade } from '@app/dashboard/state/dashboard.facade';
import { ConnectionFacade } from '@app/connections/state/connection.facade';
import { SessionUserType } from '@models/user';
import { SessionStatus } from '@models/scoping-session';
import {
  HistoryItemOptionEvent,
  HistoryItemDetailEvent,
} from '@models/history-item';
import { PopupService } from '@app/shared/popup.service';
import { SessionDetailModalComponent } from '@app/dashboard/components/session-detail-modal/session-detail-modal.component';

@TakeUntilDestroy()
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  uid$ = this.appFacade.uid$;
  historyItems$ = this.dashboardFacade.historyItems$;
  connections$ = this.connectionFacade.connections$;

  constructor(
    private appFacade: AppFacade,
    private routerFacade: RouterFacade,
    private dashboardFacade: DashboardFacade,
    private popupSvc: PopupService
  ) {}

  ngOnInit() {
    this.dashboardFacade.getHistory();
    this.connectionFacade.getConnections();
  }

  ngOnDestroy() {}

  handleOptionClick(event: HistoryItemOptionEvent) {
    this.popupSvc.openModal({
      component: SessionDetailModalComponent,
      componentProps: { accountData: event },
    });
  }

  handleDetailClick(event: HistoryItemDetailEvent) {
    console.log('details for session status', event);
  }

  refresh() {
    this.dashboardFacade.getHistory();
  }

  loadMore() {
    this.dashboardFacade.getMoreHistory();
  }

  handleJoin(sessionCode: string) {
    this.routerFacade.navigate({ path: [`/scoping/access/${sessionCode}`] });
  }

  createSession(connectionId) {
    this.routerFacade.navigate({
      path: [`/connections/${connectionId}/create-session`],
    });
  }

  goSettings() {
    this.routerFacade.navigate({ path: ['/settings'] });
  }

  addConnection() {
    this.routerFacade.navigate({ path: ['/connections/add'] });
  }

  resumeSession(sessionId) {
    this.routerFacade.navigate({ path: [`/scoping/${sessionId}`] });
  }

  viewResults(sessionId) {
    this.routerFacade.navigate({ path: [`/scoping/${sessionId}/results`] });
  }
}
