import { Component } from "@angular/core";
import { ScopingFacade } from "../../store/scoping.facade";
import { NavController, IonicPage } from "ionic-angular";
import { ScopingSession } from "../../../../models/scoping-session";
import { Subscription } from "rxjs";

@IonicPage({
  segment: "SessionResultsPage",
  priority: "high"
})
@Component({
  selector: "app-session-results",
  templateUrl: "./session-results.component.html"
})
export class SessionResultsPage {
  session: ScopingSession;
  sessionCode: string;
  sessionSub: Subscription;

  constructor(
    private scopingFacade: ScopingFacade,
    private navCtrl: NavController
  ) {
    this.sessionSub = this.scopingFacade.session$.subscribe(session => {
      this.session = session;
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
