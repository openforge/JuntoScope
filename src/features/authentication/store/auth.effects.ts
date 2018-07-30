import { Injectable } from "@angular/core";

import { Store, select } from "@ngrx/store";
import { Actions, ofType, Effect } from "@ngrx/effects";

import {
  switchMap,
  catchError,
  map,
  tap,
  exhaustMap,
  take
} from "rxjs/operators";
import { of } from "rxjs";

import { AppState } from "../../../store/app.reducer";
import { AuthQuery, AuthUiState } from "./auth.reducer";
import {
  AuthActionTypes,
  GetUserAction,
  AuthErrorAction,
  NotAuthenticatedAction,
  AuthenticatedAction,
  LoginAction,
  LogoutAction
} from "./auth.actions";
import { AuthService } from "../services/auth.service";
import { HistoryService } from "../../dashboard/services/history.service";
import { ConnectionService } from "../../connections/services/connection.service";
import { ConnectionFacade } from "../../connections/store/connection.facade";

@Injectable()
export class AuthEffects {
  /*
   * Observable Store Queries
   */

  user$ = this.store.pipe(select(AuthQuery.selectUser));

  uiState$ = this.store.pipe(select(AuthQuery.selectUiState));

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
    private authSvc: AuthService,
    private historySvc: HistoryService
  ) {}

  /*
   * Action Creators
   */

  checkAuth() {
    this.uiState$
      .pipe(
        take(1),
        map(uiState => uiState === AuthUiState.UNKNOWN)
      )
      .subscribe(unchecked => {
        if (unchecked) {
          this.store.dispatch(new GetUserAction());
        }
      });
  }

  googleLogin() {
    this.store.dispatch(new LoginAction({ provider: "google" }));
  }

  facebookLogin() {
    this.store.dispatch(new LoginAction({ provider: "facebook" }));
  }

  twitterLogin() {
    this.store.dispatch(new LoginAction({ provider: "twitter" }));
  }

  logout() {
    this.historySvc.logOut(); // Unsubscribes from uid
    this.store.dispatch(new LogoutAction());
  }
}
