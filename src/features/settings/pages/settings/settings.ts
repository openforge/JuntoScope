import { Component, OnInit, OnDestroy } from "@angular/core";
import { IonicPage, NavController } from "ionic-angular";
import { TakeUntilDestroy, untilDestroyed } from "ngx-take-until-destroy";
import { filter, take } from "rxjs/operators";
import { AuthFacade } from "../../../authentication/store/auth.facade";
import { AuthUiState } from "../../../authentication/store/auth.reducer";
import { ConnectionFacade } from "../../../connections/store/connection.facade";
import { LoginPage } from "../../../authentication/pages/login/login.component";
import { Subscription } from "rxjs";
import { SettingsService } from "../../service/settings.service";
import { FirebaseAnalytics } from "@ionic-native/firebase-analytics";

@TakeUntilDestroy()
@IonicPage({
  segment: "SettingsPage",
  priority: "high"
})
@Component({
  selector: "app-settings",
  templateUrl: "./settings.html"
})
export class SettingsPage implements OnInit, OnDestroy {
  connections$ = this.connectionFacade.connections$;
  logOutSub: Subscription;
  faqsSub: Subscription;

  private logoutRedirect$ = this.authFacade.uiState$.pipe(
    untilDestroyed(this),
    filter(authState => authState === AuthUiState.NOT_AUTHENTICATED)
  );
  faqs;

  constructor(
    private navCtrl: NavController,
    private connectionFacade: ConnectionFacade,
    private authFacade: AuthFacade,
    private settingsSvc: SettingsService,
    private firebaseAnalytics: FirebaseAnalytics
  ) {}

  ngOnDestroy() {
    this.unsub();
  }

  ngOnInit() {
    this.firebaseAnalytics.logEvent("page_view", { page: "SettingsPage" });
    this.connectionFacade.getConnections();
    this.faqsSub = this.settingsSvc.getFaqs().subscribe(faqs => {
      if (faqs) {
        this.faqs = faqs;
      }
    });
  }

  viewConnectionDetails(connectionId) {
    this.navCtrl.push("ConnectionDetailsPage", {
      connectionId: connectionId
    });
  }

  addConnection() {
    this.navCtrl.push("AddConnectionPage");
  }

  logout() {
    this.unsub();
    this.authFacade.logout();

    this.logOutSub = this.logoutRedirect$.pipe(take(1)).subscribe(() => {
      this.navCtrl.push(LoginPage);
    });
  }

  unsub() {
    if (this.logOutSub) {
      this.logOutSub.unsubscribe();
    }
    if (this.faqsSub) {
      this.faqsSub.unsubscribe();
    }
  }
}
