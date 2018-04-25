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

import { AppState } from '@app/state/app.reducer';
import {
  ConnectionsActionTypes,
  GetConnectionsAction,
  ConnectionsLoadedAction,
  ConnectionsErrorAction,
  AddConnectionAction,
  AddConnectionActionSuccess,
  AddConnectionActionFail,
} from '@app/connections/state/connections.actions';
import { ConnectionService } from '@app/connections/services/connection.service';

@Injectable()
export class ConnectionsFacade {
  @Effect()
  getConnection$ = this.actions$.pipe(
    ofType<GetConnectionsAction>(ConnectionsActionTypes.GET_CONNECTIONS),
    switchMap(action =>
      this.connectionSvc.getConnections(action.payload).pipe(
        map(connections => {
          if (!connections) {
            return new ConnectionsLoadedAction([]);
          }
          return new ConnectionsLoadedAction(connections);
        })
      )
    ),
    catchError(error =>
      of(new ConnectionsErrorAction({ message: error.message }))
    )
  );

  @Effect()
  addConnection$ = this.actions$.pipe(
    ofType<AddConnectionAction>(ConnectionsActionTypes.ADD_CONNECTION),
    switchMap(action =>
      this.connectionSvc
        .addConnection(action.payload)
        .pipe(map(response => new AddConnectionActionSuccess(response)))
    ),
    catchError(error =>
      of(new AddConnectionActionFail({ message: error.message }))
    )
  );

  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private connectionSvc: ConnectionService
  ) {}
}
