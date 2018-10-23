import { Component, OnInit } from "@angular/core";
import { ScopingFacade } from "../../store/scoping.facade";
import { NavController, IonicPage } from "ionic-angular";
import { ScopingSession } from "../../../../models/scoping-session";
import { Subscription } from "rxjs";
import { FirebaseAnalytics } from "@ionic-native/firebase-analytics";

@IonicPage({
  segment: "SessionResultsPage",
  priority: "high"
})
@Component({
  selector: "app-session-results",
  templateUrl: "./session-results.component.html"
})
export class SessionResultsPage implements OnInit {
  session: ScopingSession;
  sessionCode: string;
  sessionSub: Subscription;

  constructor(
    private scopingFacade: ScopingFacade,
    private navCtrl: NavController,
    private firebaseAnalytics: FirebaseAnalytics
  ) {
    this.sessionSub = this.scopingFacade.session$.subscribe(session => {
      this.session = session;
    });
  }

  ngOnInit() {
    this.firebaseAnalytics.logEvent("page_view", {
      page: "SessionResultsPage"
    });
  }

  ionViewWillLeave() {
    if (this.sessionSub) {
      this.sessionSub.unsubscribe();
    }
    this.scopingFacade.clearSession();
  }

  goDashboard() {
    this.navCtrl.push("DashboardPage");
  }

  goSettings() {
    this.navCtrl.push("SettingsPage");
  }

  getTotalEstimate(tasks) {
    let totalEstimate = 0;
    Object.keys(tasks).map(function(key, index) {
      totalEstimate += tasks[key].estimate;
    });
    return totalEstimate;
  }
}
