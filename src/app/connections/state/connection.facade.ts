import { Injectable } from '@angular/core';

import { Store, select } from '@ngrx/store';
import { Actions, ofType, Effect } from '@ngrx/effects';

import { switchMap, catchError, map, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { AppState } from '@app/state/app.reducer';
import {
  ConnectionActionTypes,
  QueryConnectionsAction,
  AddedConnectionAction,
  ModifiedConnectionAction,
  RemovedConnectionAction,
  AddConnectionAction,
  AddConnectionErrorAction,
  NoConnectionsAction,
} from '@app/connections/state/connection.actions';
import { ConnectionService } from '@app/connections/services/connection.service';
import { Connection } from '@models/connection';
import { ConnectionQuery } from '@app/connections/state/connection.reducer';
import { NoopAction } from '@app/state/app.actions';

@Injectable()
export class ConnectionFacade {
  /*
   * Observable Store Queries
   */
  connections$ = this.store.pipe(select(ConnectionQuery.selectAll));

  uiState$ = this.store.pipe(select(ConnectionQuery.selectUiState));

  error$ = this.store.pipe(select(ConnectionQuery.selectError));

  /*
   * Module-level Effects
   */
  @Effect()
  loadConnections$ = this.actions$.pipe(
    ofType<QueryConnectionsAction>(ConnectionActionTypes.QUERY_ALL),
    switchMap(() => this.connectionSvc.getConnections()),
    tap(changeActions => {
      if (!changeActions.length) {
        this.store.dispatch(new NoConnectionsAction());
      }
    }),
    mergeMap(changeActions => changeActions),
    map(change => {
      const id = change.payload.doc.id;
      const data: any = change.payload.doc.data();
      const connection: Connection = { id, ...data };

      switch (change.type) {
        case 'added':
          return new AddedConnectionAction({ connection });

        case 'modified':
          const changes = connection;
          return new ModifiedConnectionAction({ update: { id, changes } });

        case 'removed':
          return new RemovedConnectionAction({ connection });
      }
    })
  );

  @Effect()
  addConnection$ = this.actions$.pipe(
    ofType<AddConnectionAction>(ConnectionActionTypes.ADD),
    switchMap(action =>
      this.connectionSvc
        .addConnection(action.payload.connection)
        .pipe(
          map(() => new NoopAction()),
          catchError(error =>
            of(new AddConnectionErrorAction({ message: error.message }))
          )
        )
    )
  );

  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private connectionSvc: ConnectionService
  ) {}

  /*
   * Action Creators
   */
  getConnections() {
    this.store.dispatch(new QueryConnectionsAction());
  }

  addConnection(connection: Connection) {
    this.store.dispatch(new AddConnectionAction({ connection }));
  }
}
