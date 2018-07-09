import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";

import { map, tap, filter, switchMap } from "rxjs/operators";

import { RouterFacade } from "../store/router.facade";
import { AuthFacade } from "../features/authentication/store/auth.facade";
import { AuthUiState } from "../features/authentication/store/auth.reducer";
import { AppEffects } from "../store/app.effects";

@Injectable()
export class UnAuthGuard implements CanActivate {
  constructor(
    private appEffects: AppEffects,
    private routerFacade: RouterFacade,
    private authFacade: AuthFacade
  ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.appEffects.authRedirect$.pipe(
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
