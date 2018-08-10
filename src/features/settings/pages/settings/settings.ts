import { Component, OnInit, OnDestroy } from "@angular/core";
import { IonicPage, NavController } from "ionic-angular";
import { TakeUntilDestroy, untilDestroyed } from "ngx-take-until-destroy";
import { filter, take } from "rxjs/operators";
import { AuthEffects } from "../../../authentication/store/auth.effects";
import { AuthUiState } from "../../../authentication/store/auth.reducer";
import { ConnectionFacade } from "../../../connections/store/connection.facade";
import { LoginPage } from "../../../authentication/pages/login/login";
import { Subscription } from "rxjs";

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

  private logoutRedirect$ = this.authFacade.uiState$.pipe(
    untilDestroyed(this),
    filter(authState => authState === AuthUiState.NOT_AUTHENTICATED)
  );

  constructor(
    private navCtrl: NavController,
    private connectionFacade: ConnectionFacade,
    private authFacade: AuthEffects
  ) {}

  ngOnDestroy() {
    if (this.logOutSub) {
      this.logOutSub.unsubscribe();
    }
  }

  ngOnInit() {
    this.connectionFacade.getConnections();
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
    this.authFacade.logout();

    this.logOutSub = this.logoutRedirect$.pipe(take(1)).subscribe(() => {
      this.navCtrl.push(LoginPage);
    });
  }
}
