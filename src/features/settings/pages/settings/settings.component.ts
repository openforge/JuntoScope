import { Component, OnInit, OnDestroy } from "@angular/core";
import { TakeUntilDestroy, untilDestroyed } from "ngx-take-until-destroy";

import { map, filter, withLatestFrom, take } from "rxjs/operators";

import { AuthFacade } from "@app/authentication/state/auth.facade";
import { AuthUiState } from "@app/authentication/state/auth.reducer";
import { RouterFacade } from "@app/state/router.facade";
import { ConnectionFacade } from "@app/connections/state/connection.facade";

@TakeUntilDestroy()
@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.scss"]
})
export class SettingsComponent implements OnInit, OnDestroy {
  user$ = this.authFacade.user$;
  connections$ = this.connectionFacade.connections$;

  private logoutRedirect$ = this.authFacade.uiState$.pipe(
    untilDestroyed(this),
    filter(authState => authState === AuthUiState.NOT_AUTHENTICATED),
    withLatestFrom(this.routerFacade.queryParams$)
  );

  constructor(
    private authFacade: AuthFacade,
    private routerFacade: RouterFacade,
    private connectionFacade: ConnectionFacade
  ) {}

  ngOnDestroy() {}

  ngOnInit() {
    this.connectionFacade.getConnections();
  }

  viewConnectionDetails(connectionId) {
    this.routerFacade.navigate({ path: [`/connections/${connectionId}`] });
  }

  addConnection() {
    this.routerFacade.navigate({ path: ["/connections/add"] });
  }

  logout() {
    this.authFacade.logout();

    this.logoutRedirect$.pipe(take(1)).subscribe(() => {
      this.routerFacade.navigate({ path: ["/login"] });
    });
  }

  navigateManageConnections() {
    this.routerFacade.navigate({ path: ["/settings/manage-connections"] });
  }
}
