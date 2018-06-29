import { Component, OnInit, OnDestroy } from "@angular/core";
import { IonicPage, NavController } from "ionic-angular";
import { TakeUntilDestroy, untilDestroyed } from "ngx-take-until-destroy";

import { map, filter, withLatestFrom, take } from "rxjs/operators";

import { AuthEffects } from "../../../authentication/store/auth.effects";
import { AuthUiState } from "../../../authentication/store/auth.reducer";

// import { ConnectionFacade } from '@app/connections/state/connection.facade';
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
  // connections$ = this.connectionFacade.connections$;

  // private logoutRedirect$ = this.authFacade.uiState$.pipe(
  //   untilDestroyed(this),
  //   filter(authState => authState === AuthUiState.NOT_AUTHENTICATED),
  //   withLatestFrom(this.routerFacade.queryParams$)
  // );

  constructor(
    private authEffects: AuthEffects,
    private navCtl: NavController
  ) // private connectionFacade: ConnectionFacade
  {}

  ngOnDestroy() {}

  ngOnInit() {
    // this.connectionFacade.getConnections();
  }

  // viewConnectionDetails(connectionId) {
  //   this.routerFacade.navigate({ path: [`/connections/${connectionId}`] });
  // }

  // addConnection() {
  //   this.routerFacade.navigate({ path: ['/connections/add'] });
  // }

  // logout() {
  //   this.authFacade.logout();

  //   this.logoutRedirect$.pipe(take(1)).subscribe(() => {
  //     this.routerFacade.navigate({ path: ['/login'] });
  //   });
  // }

  // navigateManageConnections() {
  //   this.routerFacade.navigate({ path: ['/settings/manage-connections'] });
  // }
}
