import { Action } from "@ngrx/store";

import { Connection } from "../../../models/connection";

import { Project } from "../../../models/project";

export enum ConnectionActionTypes {
  QUERY_ALL = "[Connection] Query All",
  NO_CONNECTIONS = "[Connection] None Found",

  ADDED = "[Connection] Added",
  MODIFIED = "[Connection] Modified",
  REMOVE = "[Connection] Remove",
  REMOVED = "[Connection] Removed",

  ADD = "[Connection] Add",
  ADD_ERROR = "[Connection] Add Error",
  ADD_SUCCESS = "[Connection] Add Success",

  SELECTED = "[Connection] Selected",
  SELECTED_PROJECT = "[Connection] Selected Project",
  CREATE_SESSION = "[Connection] Create Session"
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

export class RemoveConnectionAction implements Action {
  readonly type = ConnectionActionTypes.REMOVE;
  constructor(public payload: { connectionId: string }) {}
}

export class RemovedConnectionAction implements Action {
  readonly type = ConnectionActionTypes.REMOVED;
  constructor(public payload: { connectionId: string }) {}
}

export class AddConnectionAction implements Action {
  readonly type = ConnectionActionTypes.ADD;
  constructor(public payload: { connection: Connection }) {}
}

export class AddConnectionErrorAction implements Action {
  readonly type = ConnectionActionTypes.ADD_ERROR;
  constructor(public payload: { message: string }) {}
}

export class AddConnectionSuccessAction implements Action {
  readonly type = ConnectionActionTypes.ADD_SUCCESS;
  constructor(public payload?: any) {}
}

export class SelectedConnectionAction implements Action {
  readonly type = ConnectionActionTypes.SELECTED;
  constructor(public payload: { connectionId: string }) {}
}

export class SelectedProjectAction implements Action {
  readonly type = ConnectionActionTypes.SELECTED_PROJECT;
  constructor(public payload: { connection: Connection; project: Project }) {}
}

export class CreateSessionAction implements Action {
  readonly type = ConnectionActionTypes.CREATE_SESSION;
  constructor(
    public payload: {
      connectionId: string;
      projectId: string;
      taskListIds: string[];
    }
  ) {}
}

export type ConnectionActions =
  | QueryConnectionsAction
  | NoConnectionsAction
  | AddedConnectionAction
  | ModifiedConnectionAction
  | RemovedConnectionAction
  | AddConnectionAction
  | AddConnectionErrorAction
  | AddConnectionSuccessAction
  | SelectedConnectionAction
  | SelectedProjectAction
  | RemoveConnectionAction
  | CreateSessionAction;
