import { Component, OnInit, OnDestroy } from '@angular/core';

import { TakeUntilDestroy, untilDestroyed } from 'ngx-take-until-destroy';

import { map, filter, withLatestFrom, take } from 'rxjs/operators';

import { AuthFacade } from '@app/authentication/state/auth.facade';
import { AuthUiState } from '@app/authentication/state/auth.reducer';
import { RouterFacade } from '@app/state/router.facade';

@TakeUntilDestroy()
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnDestroy {
  user$ = this.authFacade.user$;

  private logoutRedirect$ = this.authFacade.uiState$.pipe(
    untilDestroyed(this),
    filter(uiState => uiState === AuthUiState.NOT_AUTHENTICATED),
    withLatestFrom(this.routerFacade.queryParams$)
  );

  constructor(
    private authFacade: AuthFacade,
    private routerFacade: RouterFacade
  ) {}

  ngOnDestroy() {}

  createSession(connectionId) {
    this.routerFacade.navigate({
      path: [`/connections/${connectionId}/create-session`],
    });
  }

  addConnection() {
    this.routerFacade.navigate({ path: ['/connections/add'] });
  }

  resumeSession(sessionId) {
    this.routerFacade.navigate({ path: [`/scoping/${sessionId}`] });
  }

  viewResults(sessionId) {
    this.routerFacade.navigate({ path: [`/scoping/${sessionId}/results`] });
  }

  logout() {
    this.authFacade.logout();

    this.logoutRedirect$.pipe(take(1)).subscribe(() => {
      this.routerFacade.navigate({ path: ['/login'] });
    });
  }
}
