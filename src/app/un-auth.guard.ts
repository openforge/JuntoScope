import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

import { map, tap, filter, switchMap } from 'rxjs/operators';

import { RouterFacade } from '@app/state/router.facade';
import { AuthFacade } from '@app/authentication/state/auth.facade';
import { AuthUiState } from '@app/authentication/state/auth.reducer';
import { AppFacade } from '@app/state/app.facade';

@Injectable()
export class UnAuthGuard implements CanActivate {
  constructor(
    private appFacade: AppFacade,
    private routerFacade: RouterFacade,
    private authFacade: AuthFacade
  ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.appFacade.authRedirect$.pipe(
      filter(navOptions => !!navOptions),
      switchMap(navOptions =>
        this.authFacade.uiState$.pipe(
          filter(uiState => uiState !== AuthUiState.LOADING),
          map(uiState => uiState === AuthUiState.NOT_AUTHENTICATED),
          tap(unAuth => {
            if (!unAuth) {
              this.routerFacade.navigate(navOptions);
            }
          })
        )
      )
    );
  }
}
