import { Component, OnDestroy } from '@angular/core';

import { TakeUntilDestroy, untilDestroyed } from 'ngx-take-until-destroy';

import { map, filter, withLatestFrom, take } from 'rxjs/operators';

import { AuthFacade } from '@app/authentication/state/auth.facade';
import { AuthUiState } from '@app/authentication/state/auth.reducer';
import { RouterFacade } from '@app/state/router.facade';

@TakeUntilDestroy()
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnDestroy {
  loading$ = this.authFacade.uiState$.pipe(
    map(uiState => uiState === AuthUiState.LOADING)
  );

  authError$ = this.authFacade.error$;

  private loginRedirect$ = this.authFacade.uiState$.pipe(
    untilDestroyed(this),
    filter(uiState => uiState === AuthUiState.AUTHENTICATED),
    withLatestFrom(this.routerFacade.queryParams$)
  );

  constructor(
    private authFacade: AuthFacade,
    private routerFacade: RouterFacade
  ) {}

  ngOnDestroy() {}

  googleLogin() {
    this.authFacade.googleLogin();

    this.loginRedirect$.pipe(take(1)).subscribe(([, params]) => {
      let path = ['/scoping'];

      if (params && params.returnUrl) {
        path = [params.returnUrl];
      }

      this.routerFacade.navigate({ path });
    });
  }
}
