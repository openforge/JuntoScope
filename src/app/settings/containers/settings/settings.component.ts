import { Component, OnInit, OnDestroy } from '@angular/core';
import { TakeUntilDestroy, untilDestroyed } from 'ngx-take-until-destroy';

import { map, filter, withLatestFrom, take } from 'rxjs/operators';

import { AuthFacade } from '../../../authentication/state/auth.facade';
import { AuthUiState } from '../../../authentication/state/auth.reducer';
import { RouterFacade } from '../../../state/router.facade';

@TakeUntilDestroy()
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnDestroy {
  user$ = this.authFacade.user$;

  private logoutRedirect$ = this.authFacade.authState$.pipe(
    untilDestroyed(this),
    filter(authState => authState === AuthUiState.NOT_AUTHENTICATED),
    withLatestFrom(this.routerFacade.queryParams$)
  );

  constructor(
    private authFacade: AuthFacade,
    private routerFacade: RouterFacade
  ) {}

  ngOnDestroy() {}

  logout() {
    this.authFacade.logout();

    this.logoutRedirect$.pipe(take(1)).subscribe(() => {
      this.routerFacade.navigate({ path: ['/login'] });
    });
  }

  navigateManageConnections() {
    this.routerFacade.navigate({ path: ['/settings/manage-connections'] });
  }
}
