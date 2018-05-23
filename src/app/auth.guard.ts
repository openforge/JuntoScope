import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

import { map, tap, filter } from 'rxjs/operators';

import { RouterFacade } from '@app/state/router.facade';
import { AuthFacade } from '@app/authentication/state/auth.facade';
import { AuthUiState } from '@app/authentication/state/auth.reducer';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private routerFacade: RouterFacade,
    private authFacade: AuthFacade
  ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.authFacade.uiState$.pipe(
      filter(uiState => uiState !== AuthUiState.LOADING),
      map(uiState => uiState === AuthUiState.AUTHENTICATED),
      tap(isAuth => {
        if (!isAuth) {
          this.routerFacade.navigate({
            path: ['/login'],
            query: { returnUrl: state.url },
          });
        }
      })
    );
  }
}
