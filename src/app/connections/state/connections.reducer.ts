import { createSelector } from '@ngrx/store';

import {
  ConnectionsActions,
  ConnectionsActionTypes,
} from '@app/connections/state/connections.actions';
import { Connection } from '@models/connection';
import { AppState } from '@app/state/app.reducer';

export enum ConnectionsCase {
  LOADING = 'Loading',
  LOADED = 'Loaded',
  NOT_LOADED = 'Not Loaded',
}

export interface ConnectionsState {
  connections: Array<Connection>;
  connectionsState: ConnectionsCase;
  error: string;
}

export const initialConnectionsState: ConnectionsState = {
  connections: null,
  connectionsState: ConnectionsCase.NOT_LOADED,
  error: null,
};

export function ConnectionsReducer(
  state = initialConnectionsState,
  action: ConnectionsActions
): ConnectionsState {
  switch (action.type) {
    case ConnectionsActionTypes.GET_CONNECTIONS:
      return { ...state, connectionsState: ConnectionsCase.LOADING };

    case ConnectionsActionTypes.CONNECTIONS_LOADED:
      return {
        connections: action.payload,
        connectionsState: ConnectionsCase.LOADED,
        error: null,
      };

    case ConnectionsActionTypes.CONNECTIONS_ERROR:
      return {
        connections: null,
        connectionsState: ConnectionsCase.NOT_LOADED,
        error: action.payload.message,
      };

    case ConnectionsActionTypes.ADD_CONNECTION_SUCCESS:
      // TODO Handle cloud function response
      return state;

    case ConnectionsActionTypes.ADD_CONNECTION_FAIL:
      // TODO Handle cloud function response error
      return state;

    default:
      return state;
  }
}

export namespace ConnectionQuery {
  const getSlice = (state: AppState) => state.connections;
  export const getConnections = createSelector(
    getSlice,
    state => state.connections
  );
  export const getConnectionsState = createSelector(
    getSlice,
    state => state.connectionsState
  );
  export const getError = createSelector(getSlice, state => state.error);
}
