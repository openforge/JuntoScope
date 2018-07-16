import { Injectable } from "@angular/core";
import { Location } from "@angular/common";
// import { Router } from "@angular/router";
import { ViewChild } from "@angular/core";
import { Nav } from "ionic-angular";

import { Store, select } from "@ngrx/store";
import { Effect, Actions, ofType } from "@ngrx/effects";

import { map, tap, catchError } from "rxjs/operators";

import { AppState } from "./app.reducer";
import { RouterQuery } from "./router.reducer";
import {
  GoAction,
  BackAction,
  ForwardAction,
  RouterActionTypes,
  NavigationOptions
} from "./router.actions";

@Injectable()
export class RouterFacade {
  /*
   * Observable Store Queries
   */

  state$ = this.store.pipe(select(RouterQuery.getState));

  url$ = this.store.pipe(select(RouterQuery.getUrl));

  params$ = this.store.pipe(select(RouterQuery.getParams));

  queryParams$ = this.store.pipe(select(RouterQuery.getQueryParams));

  @ViewChild(Nav) nav: Nav;

  /*
   * Module-level Effects
   */

  @Effect({ dispatch: false })
  go$ = this.actions$.pipe(
    ofType<GoAction>(RouterActionTypes.GO),
    map(action => action.payload),
    tap(({ path, query: queryParams, extras }) => {
      // this.router.navigate(path, { queryParams, ...extras });
      // this.nav.push(path[0]);
    })
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
    // private router: Router,
    private location: Location
  ) {}

  /*
   * Action Creators
   */

  navigate(options: NavigationOptions) {
    console.log("trying to dispatch");
    this.store.dispatch(new GoAction(options));
  }

  back() {
    this.store.dispatch(new BackAction());
  }

  forward() {
    this.store.dispatch(new ForwardAction());
  }
}
