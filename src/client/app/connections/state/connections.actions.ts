import { Action } from '@ngrx/store';

import { Connection } from '../../../../models/connection';

export enum ConnectionsActionTypes {
  GET_CONNECTIONS = '[Connection] Get Connections',
  CONNECTIONS_LOADED = '[Connection] Connections Loaded',
  CONNECTIONS_ERROR = '[Connection] Connections Error',
  ADD_CONNECTION = '[Connection] Add Connection',
  ADD_CONNECTION_SUCCESS = '[Connection] Add Connection Success',
  ADD_CONNECTION_FAIL = '[Connection] Add Connection Fail',
}

export class GetConnectionsAction implements Action {
  readonly type = ConnectionsActionTypes.GET_CONNECTIONS;
  constructor(public payload: string) {}
}

export class ConnectionsLoadedAction implements Action {
  readonly type = ConnectionsActionTypes.CONNECTIONS_LOADED;
  constructor(public payload: Array<Connection>) {}
}

export class ConnectionsErrorAction implements Action {
  readonly type = ConnectionsActionTypes.CONNECTIONS_ERROR;
  constructor(public payload: { message: string }) {}
}

export class AddConnectionAction implements Action {
  readonly type = ConnectionsActionTypes.ADD_CONNECTION;
  constructor(public payload: Connection) {}
}

export class AddConnectionActionSuccess implements Action {
  readonly type = ConnectionsActionTypes.ADD_CONNECTION_SUCCESS;
  constructor(public payload?: any) {}
}

export class AddConnectionActionFail implements Action {
  readonly type = ConnectionsActionTypes.ADD_CONNECTION_FAIL;
  constructor(public payload?: any) {}
}
export type ConnectionsActions =
  | GetConnectionsAction
  | ConnectionsLoadedAction
  | ConnectionsErrorAction
  | AddConnectionAction
  | AddConnectionActionSuccess
  | AddConnectionActionFail;
