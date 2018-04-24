import { Component, OnInit, OnDestroy } from '@angular/core';

import { TakeUntilDestroy, untilDestroyed } from 'ngx-take-until-destroy';

import { map, filter, withLatestFrom, take } from 'rxjs/operators';

import { AuthFacade } from '@app/authentication/state/auth.facade';
import { AuthCase } from '@app/authentication/state/auth.reducer';
import { RouterFacade } from '@app/state/router.facade';

@TakeUntilDestroy()
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnDestroy {
  user$ = this.authFacade.user$;

  private logoutRedirect$ = this.authFacade.authState$.pipe(
    untilDestroyed(this),
    filter(authState => authState === AuthCase.NOT_AUTHENTICATED),
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
}
