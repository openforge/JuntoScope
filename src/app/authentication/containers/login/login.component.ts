import { Component, OnDestroy } from '@angular/core';

import { TakeUntilDestroy, untilDestroyed } from 'ngx-take-until-destroy';

import { map, filter, withLatestFrom, take } from 'rxjs/operators';

import { AuthFacade } from '../../state/auth.facade';
import { AuthCase } from '../../state/auth.reducer';
import { RouterFacade } from '../../../state/router.facade';

@TakeUntilDestroy()
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnDestroy {
  loading$ = this.authFacade.authState$.pipe(
    map(authState => authState === AuthCase.LOADING)
  );

  authError$ = this.authFacade.error$;

  private loginRedirect$ = this.authFacade.authState$.pipe(
    untilDestroyed(this),
    filter(authState => authState === AuthCase.AUTHENTICATED),
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
