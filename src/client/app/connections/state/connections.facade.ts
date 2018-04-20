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

import { AppState } from '../../state/app.state';
import {
  ConnectionsActionTypes,
  GetConnectionsAction,
  ConnectionsLoadedAction,
  ConnectionsErrorAction,
} from './connections.actions';
import { ConnectionsService } from '../services/connections.service';

@Injectable()
export class ConnectionsFacade {
  @Effect()
  getConnection$ = this.actions$.pipe(
    ofType<GetConnectionsAction>(ConnectionsActionTypes.GET_CONNECTIONS),
    switchMap(action =>
      this.connectionsSvc.getConnections(action.payload).pipe(
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

  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private connectionsSvc: ConnectionsService
  ) {}
}
