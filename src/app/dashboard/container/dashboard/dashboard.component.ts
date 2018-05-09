import { Component, OnInit, OnDestroy } from '@angular/core';

import { TakeUntilDestroy, untilDestroyed } from 'ngx-take-until-destroy';

import { map, filter, withLatestFrom, take, tap } from 'rxjs/operators';

import { AppFacade } from '@app/state/app.facade';
import { RouterFacade } from '@app/state/router.facade';
import { DashboardFacade } from '@app/dashboard/state/dashboard.facade';
import { SessionUserType } from '@models/user';
import { SessionStatus } from '@models/scoping-session';
import {
  HistoryItemOptionEvent,
  HistoryItemDetailEvent,
} from '@models/history-item';

@TakeUntilDestroy()
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  uid$ = this.appFacade.uid$;
  historyItems$ = this.dashboardFacade.historyItems$;

  constructor(
    private appFacade: AppFacade,
    private routerFacade: RouterFacade,
    private dashboardFacade: DashboardFacade
  ) {}

  ngOnInit() {
    this.dashboardFacade.getHistory();
  }

  ngOnDestroy() {}

  handleOptionClick(event: HistoryItemOptionEvent) {
    console.log('options for User Type', event);
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
