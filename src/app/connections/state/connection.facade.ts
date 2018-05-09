import { Injectable } from '@angular/core';

import { Store, select } from '@ngrx/store';
import { Actions, ofType, Effect } from '@ngrx/effects';

import {
  switchMap,
  catchError,
  map,
  mergeMap,
  tap,
  take,
  filter,
} from 'rxjs/operators';
import { of, combineLatest, empty } from 'rxjs';

import { AppState } from '@app/state/app.reducer';
import {
  ConnectionActionTypes,
  QueryConnectionsAction,
  AddedConnectionAction,
  ModifiedConnectionAction,
  RemovedConnectionAction,
  AddConnectionAction,
  SelectedConnectionAction,
  AddConnectionErrorAction,
  NoConnectionsAction,
} from '@app/connections/state/connection.actions';
import { ConnectionService } from '@app/connections/services/connection.service';
import { Connection } from '@models/connection';
import {
  ConnectionQuery,
  ConnectionUiState,
} from '@app/connections/state/connection.reducer';
import { NoopAction } from '@app/state/app.actions';
import { PopupService } from '@app/shared/popup.service';
import { RouterFacade } from '@app/state/router.facade';
import * as RouterActions from '@app/state/router.actions';

@Injectable()
export class ConnectionFacade {
  /*
   * Observable Store Queries
   */
  connections$ = this.store.pipe(select(ConnectionQuery.selectAll));

  uiState$ = this.store.pipe(select(ConnectionQuery.selectUiState));

  error$ = this.store.pipe(select(ConnectionQuery.selectError));

  selectedConnection$ = this.store.pipe(
    select(ConnectionQuery.selectSelectedConnection)
  );

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
          switchMap((response: any) =>
            this.popupSvc.simpleAlert(
              'Verify Account',
              `Connection type: ${response.type} Company name: ${
                response.externalData.company
              } Account name: ${response.externalData.name}`,
              'Next'
            )
          ),
          map(() => new RouterActions.GoAction({ path: ['/dashboard'] })),
          catchError(error =>
            of(new AddConnectionErrorAction({ message: error.message }))
          )
        )
    )
  );

  @Effect()
  selectConnection$ = this.actions$.pipe(
    ofType<SelectedConnectionAction>(ConnectionActionTypes.SELECTED),
    tap(res => console.log(res)),
    switchMap(action =>
      this.connectionSvc.getProjects(action.payload.connectionId).pipe(
        map(
          projects =>
            new ModifiedConnectionAction({
              update: {
                id: action.payload.connectionId,
                changes: { projects },
              },
            })
        ),
        catchError(error =>
          of(new AddConnectionErrorAction({ message: error.message }))
        )
      )
    )
  );

  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private connectionSvc: ConnectionService,
    private popupSvc: PopupService,
    private routerFacade: RouterFacade
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

  selectConnection(connectionId: string) {
    this.uiState$
      .pipe(
        take(1),
        switchMap(currentState => {
          if (currentState === ConnectionUiState.LOADED) {
            return of(currentState);
          } else if (currentState !== ConnectionUiState.LOADING) {
            this.getConnections();

            return this.uiState$.pipe(
              filter(state => state === ConnectionUiState.LOADED),
              take(1)
            );
          }
        })
      )
      .subscribe(() => {
        this.store.dispatch(new SelectedConnectionAction({ connectionId }));
      });
  }
}
