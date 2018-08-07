import { Component, OnInit, OnDestroy } from "@angular/core";

import { InfiniteScroll, IonicPage, NavController, ViewController } from "ionic-angular";

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
import { SessionScopingComponent } from "../../../scoping/pages/session-scoping/session-scoping.component";
import { DashboardUiState } from "../../store/dashboard.reducer";
import { SessionResultsComponent } from "../../../scoping/pages/session-results/session-results.component";
import { ScopingFacade } from "../../../scoping/store/scoping.facade";

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
  historyItems$ = this.dashboardFacade.historyItems$;
  uiState$ = this.dashboardFacade.uiState$.subscribe(uiState => {
    if (uiState === DashboardUiState.LOADED && this.infiniteScroll) {
      this.infiniteScroll.complete();
      this.infiniteScroll = null;
    }
  });
  connections$ = this.connectionFacade.connections$;

  constructor(
    private appFacade: AppEffects,
    private routerFacade: RouterFacade,
    private dashboardFacade: DashboardEffects,
    private popupSvc: PopupService,
    private connectionFacade: ConnectionFacade,
    private navCtrl: NavController,
    private scopingFacade: ScopingFacade,
    private viewCtrl: ViewController
  ) {}

  ngOnInit() {
    this.dashboardFacade.getHistory();
    this.connectionFacade.getConnections();
  }

  ngOnDestroy() {}

  ionViewWillEnter() {
    this.viewCtrl.showBackButton(false);
  }

  handleOptionClick(event: HistoryItemOptionEvent) {
    this.modal = this.popupSvc.openModal({
      component: SessionDetailModalComponent,
      componentProps: { accountData: event }
    });
  }

  handleDetailClick(event: HistoryItemDetailEvent) {
    console.log("details for session status", event);
    // this.routerFacade.navigate({
    //   path: [`/scoping/${event.item.sessionCode}`]
    // });
    this.scopingFacade.loadSession(event.item.id);

    if (event.status === "Session Completed") {
      this.navCtrl.push(SessionResultsComponent, {
        sessionUrl: event.item.sessionCode
      });
    } else {
      this.navCtrl.push(SessionScopingComponent, {
        sessionUrl: event.item.sessionCode
      });
    }
  }

  // Unused
  refresh() {
    this.dashboardFacade.getHistory();
  }

  loadMore(infiniteScroll) {
    this.infiniteScroll = infiniteScroll;
    setTimeout(() => {
      this.dashboardFacade.getMoreHistory();
    }, 1000);
  }

  handleJoin(sessionCode: string) {
    this.navCtrl.push(SessionScopingComponent, { sessionUrl: sessionCode });
  }

  createSession(connection: Connection) {
    console.log("How bout this: ", connection.id);
    this.navCtrl.push(SelectProjectComponent, { connectionId: connection.id });
  }

  goSettings() {
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
