import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

import { map, tap, filter, switchMap, first, take } from 'rxjs/operators';

import { RouterFacade } from '@app/state/router.facade';
import { AuthFacade } from '@app/authentication/state/auth.facade';
import { AuthCase } from '@app/authentication/state/auth.reducer';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private routerFacade: RouterFacade,
    private authFacade: AuthFacade
  ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const isAuth$ = this.authFacade.authState$.pipe(
      filter(authState => authState !== AuthCase.LOADING),
      take(1),
      map(authState => authState === AuthCase.AUTHENTICATED),
      tap(isAuth => {
        if (!isAuth) {
          this.routerFacade.navigate({
            path: ['/login'],
            query: { returnUrl: state.url },
          });
        }
      })
    );

    return this.authFacade.checkAuth().pipe(switchMap(() => isAuth$));
  }
}
