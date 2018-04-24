import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { Store, select } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';

import { map, tap } from 'rxjs/operators';

import { AppState } from '@app/state/app.state';
import { RouterQuery } from '@app/state/router.reducer';
import {
  GoAction,
  BackAction,
  ForwardAction,
  RouterActionTypes,
  NavigationOptions,
} from '@app/state/router.actions';

@Injectable()
export class RouterFacade {
  /*
   * Observable Store Queries
   */

  state$ = this.store.pipe(select(RouterQuery.getState));

  url$ = this.store.pipe(select(RouterQuery.getUrl));

  params$ = this.store.pipe(select(RouterQuery.getParams));

  queryParams$ = this.store.pipe(select(RouterQuery.getQueryParams));

  /*
   * Module-level Effects
   */

  @Effect({ dispatch: false })
  go$ = this.actions$.pipe(
    ofType<GoAction>(RouterActionTypes.GO),
    map(action => action.payload),
    tap(({ path, query: queryParams, extras }) =>
      this.router.navigate(path, { queryParams, ...extras })
    )
  );

  @Effect({ dispatch: false })
  back$ = this.actions$.pipe(
    ofType<BackAction>(RouterActionTypes.BACK),
    tap(() => this.location.back())
  );

  @Effect({ dispatch: false })
  forward$ = this.actions$.pipe(
    ofType<ForwardAction>(RouterActionTypes.FORWARD),
    tap(() => this.location.forward())
  );

  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private router: Router,
    private location: Location
  ) {}

  /*
   * Action Creators
   */

  navigate(options: NavigationOptions) {
    this.store.dispatch(new GoAction(options));
  }

  back() {
    this.store.dispatch(new BackAction());
  }

  forward() {
    this.store.dispatch(new ForwardAction());
  }
}
