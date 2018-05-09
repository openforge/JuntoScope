import { Action } from '@ngrx/store';

import { Connection } from '@models/connection';

export enum ConnectionActionTypes {
  QUERY_ALL = '[Connection] Query All',
  NO_CONNECTIONS = '[Connection] None Found',

  ADDED = '[Connection] Added',
  MODIFIED = '[Connection] Modified',
  REMOVED = '[Connection] Removed',

  ADD = '[Connection] Add',
  ADD_ERROR = '[Connection] Add Error',

  SELECTED = '[Connection] Selected',
}

export class QueryConnectionsAction implements Action {
  readonly type = ConnectionActionTypes.QUERY_ALL;
}

export class NoConnectionsAction implements Action {
  readonly type = ConnectionActionTypes.NO_CONNECTIONS;
}

export class AddedConnectionAction implements Action {
  readonly type = ConnectionActionTypes.ADDED;
  constructor(public payload: { connection: Connection }) {}
}

export class ModifiedConnectionAction implements Action {
  readonly type = ConnectionActionTypes.MODIFIED;
  constructor(
    public payload: { update: { id: string; changes: Partial<Connection> } }
  ) {}
}

export class RemovedConnectionAction implements Action {
  readonly type = ConnectionActionTypes.REMOVED;
  constructor(public payload: { connection: Connection }) {}
}

export class AddConnectionAction implements Action {
  readonly type = ConnectionActionTypes.ADD;
  constructor(public payload: { connection: Connection }) {}
}

export class AddConnectionErrorAction implements Action {
  readonly type = ConnectionActionTypes.ADD_ERROR;
  constructor(public payload: { message: string }) {}
}

export class SelectedConnectionAction implements Action {
  readonly type = ConnectionActionTypes.SELECTED;
  constructor(public payload: { connection: Connection }) {}
}

export type ConnectionActions =
  | QueryConnectionsAction
  | NoConnectionsAction
  | AddedConnectionAction
  | ModifiedConnectionAction
  | RemovedConnectionAction
  | AddConnectionAction
  | AddConnectionErrorAction
  | SelectedConnectionAction;
