import { Injectable } from "@angular/core";
import { Location } from "@angular/common";
import { ViewChild } from "@angular/core";
import { Nav } from "ionic-angular";
import { Store } from "@ngrx/store";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { map, tap } from "rxjs/operators";
import { AppState } from "./app.reducer";
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

  @ViewChild(Nav) nav: Nav;

  /*
   * Module-level Effects
   */

  @Effect({ dispatch: false })
  go$ = this.actions$.pipe(
    ofType<GoAction>(RouterActionTypes.GO),
    map(action => action.payload),
    tap(({ path, query: queryParams, extras }) => {
      this.nav.push(path[0]);
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
