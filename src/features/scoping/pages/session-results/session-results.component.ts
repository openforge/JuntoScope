import { Component, OnInit } from "@angular/core";
// import { ScopingSession } from '../../../../models/scoping-session';
// import { User } from '@models/user';
import { Store } from "@ngrx/store";
import { AppState } from "../../../../store/app.reducer";
// import { AuthQuery } from '@app/authentication/state/auth.reducer';
import { ScopingFacade } from "../../store/scoping.facade";
import { NavParams, NavController } from "ionic-angular";
import { ScopingSession } from "../../../../models/scoping-session";
import { Observable, Subscription } from "rxjs";
import { DashboardComponent } from "../../../dashboard/pages/dashboard/dashboard.component";
import { SettingsPage } from "../../../settings/pages/settings/settings";

@Component({
  selector: "app-session-results",
  templateUrl: "./session-results.component.html"
})
export class SessionResultsComponent implements OnInit {
  // session: Observable<ScopingSession>;
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
    // this.sessionCode = this.navParams.get('sessionUrl');
    // this.scopingFacade.loadSession(this.sessionCode);
    // this.session = this.scopingFacade.session$;
    // this.params$.pipe(take(1)).subscribe(params => {
    //   this.sessionCode = params.sessionCode;
    //   this.scopingFacade.loadSession(this.sessionCode);
    // });
    // this.sessionCode = this.navParams.get('sessionCode');
    // this.scopingFacade.loadSession(this.sessionCode);
    /*
    this.session = {
      id: 'xIUiPVQX1pn0sbKdC6EF',
      ownerId: '4unCMQb5lGgORDo2Y5UUWlBcUHj1',
      connectionId: 'THfDyZ5ql7PbyDvzuyuZ',
      projectName: 'Test project',
      currentTaskId: 'prFpkJAGoM4HnRkajCys',
      numTasks: 1,
      numScopedTasks: 1,
      tasks: {
        prFpkJAGoM4HnRkajCys: {
          name: 'Test task 1',
          description: 'This is a description',
          votes: {
            '4unCMQb5lGgORDo2Y5UUWlBcUHj1': 3,
          },
          estimate: 5,
        },
      },
      participants: {
        '4unCMQb5lGgORDo2Y5UUWlBcUHj1': 1111,
      },
    };
    */
  }

  ionViewCanEnter() {
    // this.sessionCode = this.navParams.get('sessionUrl');
    // console.log("Session code: ", this.sessionCode);
    // this.scopingFacade.loadSession(this.sessionCode);
    // this.scopingFacade.session$.subscribe(session => {
    //   this.session = session;
    // });
  }

  ionViewWillLeave() {
    if (this.sessionSub) {
      this.sessionSub.unsubscribe();
    }
  }

  goDashboard() {
    this.navCtrl.push(DashboardComponent);
  }

  ngOnInit() {}

  goSettings() {
    this.navCtrl.push(SettingsPage);
  }
}
