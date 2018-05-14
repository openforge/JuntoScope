import { Component, OnInit, OnDestroy } from '@angular/core';

import { InfiniteScroll } from '@ionic/angular';

import { TakeUntilDestroy, untilDestroyed } from 'ngx-take-until-destroy';

import { map, filter, withLatestFrom, take, tap } from 'rxjs/operators';

import { AppFacade } from '@app/state/app.facade';
import { RouterFacade } from '@app/state/router.facade';
import { DashboardFacade } from '@app/dashboard/state/dashboard.facade';
import { ConnectionFacade } from '@app/connections/state/connection.facade';
import { SessionUserType } from '@models/user';
import { SessionStatus } from '@models/scoping-session';
import { Connection } from '@models/connection';
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
  private infiniteScroll: InfiniteScroll;

  uid$ = this.appFacade.uid$;
  historyItems$ = this.dashboardFacade.historyItems$.pipe(
    tap(items => {
      if (this.infiniteScroll) {
        this.infiniteScroll.complete();
        this.infiniteScroll = null;
      }
    })
  );
  connections$ = this.connectionFacade.connections$;

  constructor(
    private appFacade: AppFacade,
    private routerFacade: RouterFacade,
    private dashboardFacade: DashboardFacade,
    private popupSvc: PopupService,
    private connectionFacade: ConnectionFacade
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
    this.routerFacade.navigate({
      path: [`/scoping/${event.item.id}`],
    });
  }

  // Unused
  refresh() {
    this.dashboardFacade.getHistory();
  }

  loadMore(infiniteScroll: InfiniteScroll) {
    this.infiniteScroll = infiniteScroll;
    this.dashboardFacade.getMoreHistory();
  }

  handleJoin(sessionCode: string) {
    this.routerFacade.navigate({ path: [`/scoping/${sessionCode}`] });
  }

  createSession(connection: Connection) {
    this.routerFacade.navigate({
      path: [`/connections/${connection.id}/projects`],
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
