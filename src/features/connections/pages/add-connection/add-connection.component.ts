import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { NavController, IonicPage } from "ionic-angular";

import { Actions } from "@ngrx/effects";
import { Subscription } from "rxjs";

import { ConnectionActionTypes } from "../../store/connection.actions";
import { PopupService } from "../../../../shared/popup.service";
import { ConnectionFacade } from "../../store/connection.facade";
import { LoadingService } from "../../../../shared/loading.service";
import { SafariViewController } from "@ionic-native/safari-view-controller";

@IonicPage({
  segment: "AddConnectionPage",
  priority: "high"
})
@Component({
  selector: "app-add-connection",
  templateUrl: "./add-connection.component.html"
})
export class AddConnectionPage implements OnInit {
  connectionForm: FormGroup;
  type: string;
  errorSubscription: Subscription;
  redirectSubs: Subscription;
  addError$ = this.connectionFacade.error$;

  constructor(
    private navCtrl: NavController,
    private connectionFacade: ConnectionFacade,
    private actions$: Actions,
    private popupSvc: PopupService,
    private loadingSvc: LoadingService,
    private svc: SafariViewController
  ) {
    this.redirectSubs = this.actions$
      .ofType(ConnectionActionTypes.ADD_SUCCESS)
      .subscribe(() => {
        this.loadingSvc.dismiss();
        this.redirectSubs.unsubscribe();
        this.navCtrl.push("DashboardPage");
      });

    this.errorSubscription = this.addError$.subscribe(error => {
      if (error) {
        this.loadingSvc.hide();
        this.popupSvc.simpleAlert("Uh Oh!", error, "OK");
        this.connectionFacade.clearError();
      }
    });
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.errorSubscription.unsubscribe();
  }

  register() {
    this.svc.isAvailable().then((available: boolean) => {
      if (available) {
        this.svc
          .show({
            url: "https://www.teamwork.com/?partner=gqfq4mb55o",
            hidden: false,
            animated: false,
            transition: "curl",
            enterReaderModeIfAvailable: true,
            tintColor: "#ff0000"
          })
          .subscribe(
            (result: any) => {
              if (result.event === "opened") console.log("Opened");
              else if (result.event === "loaded") console.log("Loaded");
              else if (result.event === "closed") console.log("Closed");
            },
            (error: any) => console.error(error)
          );
      } else {
        // use fallback browser, example InAppBrowser
      }
    });
  }

  connectTeamwork() {
    const redirect_uri = "juntoscope://";
    const teamworkUrl = `https://www.teamwork.com/launchpad/login?redirect_uri=${redirect_uri}`;

    this.svc.isAvailable().then((available: boolean) => {
      if (available) {
        this.svc
          .show({
            url: teamworkUrl,
            hidden: false,
            animated: false,
            transition: "curl",
            enterReaderModeIfAvailable: true,
            tintColor: "#ff0000"
          })
          .subscribe(
            (result: any) => {
              if (result.event === "opened") console.log("Opened");
              else if (result.event === "loaded") console.log("Loaded");
              else if (result.event === "closed") console.log("Closed");
            },
            (error: any) => console.error(error)
          );
      } else {
        // use fallback browser, example InAppBrowser
      }
    });
  }
}
