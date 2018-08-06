import { Component, OnInit, OnDestroy } from "@angular/core";
import { IonicPage, NavController } from "ionic-angular";
import { TakeUntilDestroy, untilDestroyed } from "ngx-take-until-destroy";

import { map, filter, withLatestFrom, take } from "rxjs/operators";

import { AuthEffects } from "../../../authentication/store/auth.effects";
import { AuthUiState } from "../../../authentication/store/auth.reducer";

import { ConnectionFacade } from "../../../connections/store/connection.facade";
import { LoginPage } from "../../../authentication/pages/login/login";
import { ConnectionDetailsComponent } from "../../../connections/pages/connection-details/connection-details.component";
import { AddConnectionComponent } from "../../../connections/pages/add-connection/add-connection.component";
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
  // user$ = this.authFacade.user$;
  connections$ = this.connectionFacade.connections$;
  logOutSub: Subscription;

  private logoutRedirect$ = this.authFacade.uiState$.pipe(
    untilDestroyed(this),
    filter(authState => authState === AuthUiState.NOT_AUTHENTICATED)
    // withLatestFrom(this.routerFacade.queryParams$)
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
    // this.routerFacade.navigate({ path: [`/connections/${connectionId}`] });
    this.navCtrl.push(ConnectionDetailsComponent, {
      connectionId: connectionId
    });
  }

  addConnection() {
    // this.routerFacade.navigate({ path: ['/connections/add'] });
    this.navCtrl.push(AddConnectionComponent);
  }

  logout() {
    this.authFacade.logout();

    this.logOutSub = this.logoutRedirect$.pipe(take(1)).subscribe(() => {
      // this.routerFacade.navigate({ path: ['/login'] });
      // window.location.reload();
      this.navCtrl.push(LoginPage);
    });
  }

  navigateManageConnections() {
    // this.routerFacade.navigate({ path: ['/settings/manage-connections'] });
  }

  createSession() {
    // this.routerFacade.navigate({
    //   path: [`/connections/${connection.id}/projects`]
    // });
    // console.log("How bout this: ", connection.id);
    // this.navCtrl.push(SelectProjectComponent, { connectionId: connection.id });
  }
}
