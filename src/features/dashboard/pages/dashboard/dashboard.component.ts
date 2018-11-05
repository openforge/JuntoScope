import { Component, OnInit, OnDestroy } from "@angular/core";
import {
  InfiniteScroll,
  IonicPage,
  NavController,
  ViewController
} from "ionic-angular";
import { TakeUntilDestroy } from "ngx-take-until-destroy";
import { AppFacade } from "../../../../store/app.facade";
import { DashboardFacade } from "../../store/dashboard.facade";
import { ConnectionFacade } from "../../../connections/store/connection.facade";
import { Connection } from "../../../../models/connection";
import {
  HistoryItemOptionEvent,
  HistoryItemDetailEvent
} from "../../../../models/history-item";
import { PopupService } from "../../../../shared/popup.service";
import { SessionDetailModalComponent } from "../../components/session-detail-modal/session-detail-modal.component";
import { DashboardUiState } from "../../store/dashboard.reducer";
import { ScopingFacade } from "../../../scoping/store/scoping.facade";
import { FirebaseAnalytics } from "@ionic-native/firebase-analytics";

@TakeUntilDestroy()
@IonicPage({
  segment: "DashboardPage",
  priority: "high"
})
@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html"
})
export class DashboardPage implements OnInit, OnDestroy {
  private infiniteScroll: InfiniteScroll;
  modal;

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
    private appFacade: AppFacade,
    private dashboardFacade: DashboardFacade,
    private popupSvc: PopupService,
    private connectionFacade: ConnectionFacade,
    private navCtrl: NavController,
    private scopingFacade: ScopingFacade,
    private viewCtrl: ViewController,
    private firebaseAnalytics: FirebaseAnalytics
  ) {}

  ngOnInit() {
    this.firebaseAnalytics.logEvent("page_view", { page: "DashboardPage" });
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
    this.scopingFacade.loadSession(event.item.id);

    if (event.status === "Session Completed") {
      this.navCtrl.push("SessionResultsPage", {
        sessionUrl: event.item.sessionCode
      });
    } else {
      this.navCtrl.push("SessionScopingPage", {
        sessionUrl: event.item.sessionCode
      });
    }
  }

  loadMore(infiniteScroll) {
    this.infiniteScroll = infiniteScroll;
    setTimeout(() => {
      this.dashboardFacade.getMoreHistory();
    }, 1000);
  }

  handleJoin(sessionCode: string) {
    this.navCtrl.push("SessionScopingPage", { sessionUrl: sessionCode });
  }

  createSession(connection: Connection) {
    this.navCtrl.push("SelectProjectPage", { connectionId: connection.id });
  }

  goSettings() {
    this.navCtrl.push("SettingsPage");
  }

  addConnection() {
    this.navCtrl.push("AddConnectionPage");
  }
}
