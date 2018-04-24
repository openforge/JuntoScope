import { Injectable } from '@angular/core';

import { Store, select } from '@ngrx/store';
import { Actions, ofType, Effect } from '@ngrx/effects';

import {
  switchMap,
  catchError,
  map,
  tap,
  exhaustMap,
  take,
} from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { AppState } from '@app/state/app.state';
import { AuthQuery, AuthUiState } from '@app/authentication/state/auth.reducer';
import {
  AuthActionTypes,
  GetUserAction,
  AuthErrorAction,
  NotAuthenticatedAction,
  AuthenticatedAction,
  LoginAction,
  LogoutAction,
} from '@app/authentication/state/auth.actions';
import { AuthService } from '@app/authentication/services/auth.service';

@Injectable()
export class AuthFacade {
  /*
   * Observable Store Queries
   */

  user$ = this.store.pipe(select(AuthQuery.selectUser));

  authState$ = this.store.pipe(select(AuthQuery.selectUiState));

  error$ = this.store.pipe(select(AuthQuery.selectError));

  /*
   * Module-level Effects
   */

  @Effect()
  getUser$ = this.actions$.pipe(
    ofType<GetUserAction>(AuthActionTypes.GET_USER),
    switchMap(action =>
      this.authSvc.getUser().pipe(
        map(user => {
          if (!user) {
            return new NotAuthenticatedAction();
          }

          return new AuthenticatedAction(user);
        })
      )
    ),
    catchError(error => of(new AuthErrorAction({ message: error.message })))
  );

  @Effect()
  login$ = this.actions$.pipe(
    ofType<LoginAction>(AuthActionTypes.LOGIN),
    map(action => action.payload),
    exhaustMap(({ provider }) =>
      this.authSvc
        .login(provider)
        .then(() => new GetUserAction())
        .catch(({ message }) => new AuthErrorAction({ message }))
    ),
    catchError(error => of(new AuthErrorAction({ message: error.message })))
  );

  @Effect({ dispatch: false })
  logout$ = this.actions$.pipe(
    ofType<LogoutAction>(AuthActionTypes.LOGOUT),
    tap(() => this.authSvc.logout()),
    catchError(error => of(new AuthErrorAction({ message: error.message })))
  );

  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private authSvc: AuthService
  ) {}

  /*
   * Action Creators
   */

  checkAuth() {
    return this.authState$.pipe(
      take(1),
      map(state => state === AuthUiState.NOT_AUTHENTICATED),
      tap(unAuth => {
        if (unAuth) {
          this.store.dispatch(new GetUserAction());
        }
      })
    );
  }

  googleLogin() {
    this.store.dispatch(new LoginAction({ provider: 'google' }));
  }

  logout() {
    this.store.dispatch(new LogoutAction());
  }
}
