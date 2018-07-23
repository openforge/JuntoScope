import { Component, OnInit, OnDestroy } from "@angular/core";

import { InfiniteScroll, IonicPage, NavController } from "ionic-angular";

import { TakeUntilDestroy, untilDestroyed } from "ngx-take-until-destroy";

import { map, filter, withLatestFrom, take, tap } from "rxjs/operators";

import { AppEffects } from "../../../../store/app.effects";
import { RouterFacade } from "../../../../store/router.facade";
import { DashboardEffects } from "../../store/dashboard.effects";
import { ConnectionFacade } from "../../../connections/store/connection.facade";
// import { SessionUserType } from '@models/user';
// import { SessionStatus } from '@models/scoping-session';
import { Connection } from "../../../../models/connection";
import {
  HistoryItemOptionEvent,
  HistoryItemDetailEvent
} from "../../../../models/history-item";
import { PopupService } from "../../../../shared/popup.service";
import { SessionDetailModalComponent } from "../../components/session-detail-modal/session-detail-modal.component";
import { SelectProjectComponent } from "../../../connections/pages/select-project/select-project.component";
import { SettingsPage } from "../../../settings/pages/settings/settings";
import { AddConnectionComponent } from "../../../connections/pages/add-connection/add-connection.component";

@TakeUntilDestroy()
@IonicPage({
  segment: "DashboardPage",
  priority: "high"
})
@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html"
})
export class DashboardComponent implements OnInit, OnDestroy {
  private infiniteScroll: InfiniteScroll;
  private modal;

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
    private appFacade: AppEffects,
    private routerFacade: RouterFacade,
    private dashboardFacade: DashboardEffects,
    private popupSvc: PopupService,
    private connectionFacade: ConnectionFacade,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.dashboardFacade.getHistory();
    this.connectionFacade.getConnections();
  }

  ngOnDestroy() {}

  handleOptionClick(event: HistoryItemOptionEvent) {
    this.modal = this.popupSvc.openModal({
      component: SessionDetailModalComponent,
      componentProps: { accountData: event }
    });
  }

  handleDetailClick(event: HistoryItemDetailEvent) {
    console.log("details for session status", event);
    this.routerFacade.navigate({
      path: [`/scoping/${event.item.sessionCode}`]
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
    // this.routerFacade.navigate({
    //   path: [`/connections/${connection.id}/projects`]
    // });
    console.log("How bout this: ", connection.id);
    this.navCtrl.push(SelectProjectComponent, { connectionId: connection.id });
  }

  goSettings() {
    // this.routerFacade.navigate({ path: ["/settings"] });
    this.navCtrl.push(SettingsPage);
  }

  addConnection() {
    // this.routerFacade.navigate({ path: ["/connections/add"] });
    this.navCtrl.push(AddConnectionComponent);
  }

  resumeSession(sessionId) {
    this.routerFacade.navigate({ path: [`/scoping/${sessionId}`] });
  }

  viewResults(sessionId) {
    this.routerFacade.navigate({ path: [`/scoping/${sessionId}/results`] });
  }
}
