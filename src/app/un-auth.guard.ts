import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

import { map, tap, filter, switchMap, take } from 'rxjs/operators';

import { RouterFacade } from './state/router.facade';
import { AuthFacade } from './authentication/state/auth.facade';
import { AuthCase } from './authentication/state/auth.reducer';

@Injectable()
export class UnAuthGuard implements CanActivate {
  constructor(
    private routerFacade: RouterFacade,
    private authFacade: AuthFacade
  ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const isUnAuth$ = this.authFacade.authState$.pipe(
      filter(authState => authState !== AuthCase.LOADING),
      take(1),
      map(authState => authState === AuthCase.NOT_AUTHENTICATED),
      tap(unAuth => {
        if (!unAuth) {
          this.routerFacade.navigate({ path: ['/scoping'] });
        }
      })
    );

    return this.authFacade.checkAuth().pipe(switchMap(() => isUnAuth$));
  }
}
