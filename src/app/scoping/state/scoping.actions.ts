import { Action } from '@ngrx/store';
import { ScopingSession } from '@models/scoping-session';
import { Task } from '@models/task';

export enum ScopingActionTypes {
  LOAD_SESSION = '[Scoping] Load Session',
  LOAD_SESSION_SUCCESS = '[Scoping] Load Session Success',
  LOAD_SESSION_ERROR = '[Scoping] Load Session Error',
  VOTE = '[Scoping] Vote',
  VOTE_SUCCESS = '[Scoping] Vote Success',
  VOTE_ERROR = '[Scoping] Vote Error',
  SET_ESTIMATE = '[Scoping] Set Estimate',
  SET_ESTIMATE_SUCCESS = '[Scoping] Set Estimate Success',
  SET_ESTIMATE_ERROR = '[Scoping] Set Estimate Error',
}

export class LoadSessionAction implements Action {
  readonly type = ScopingActionTypes.LOAD_SESSION;
  constructor(
    public payload?: {
      ownerId: string;
      connectionId: string;
      sessionId: string;
    }
  ) {}
}

export class LoadSessionSuccessAction implements Action {
  readonly type = ScopingActionTypes.LOAD_SESSION_SUCCESS;
  constructor(public payload?: ScopingSession) {}
}

export class LoadSessionErrorAction implements Action {
  readonly type = ScopingActionTypes.LOAD_SESSION_ERROR;
  constructor(public payload: { message: string }) {}
}

export class VoteAction implements Action {
  readonly type = ScopingActionTypes.VOTE;
  constructor(
    public payload: {
      userId: string;
      moderatorId: string;
      connectionId: string;
      sessionId: string;
      taskId: string;
      estimate: number;
    }
  ) {}
}

export class VoteSuccessAction implements Action {
  readonly type = ScopingActionTypes.VOTE_SUCCESS;
  constructor(public payload?: any) {}
}

export class VoteErrorAction implements Action {
  readonly type = ScopingActionTypes.VOTE_ERROR;
  constructor(public payload: { message: string }) {}
}

export class SetEstimateAction implements Action {
  readonly type = ScopingActionTypes.SET_ESTIMATE;
  constructor(
    public payload: {
      userId: string;
      moderatorId: string;
      connectionId: string;
      sessionId: string;
      taskId: string;
      estimate: number;
    }
  ) {}
}

export class SetEstimateSuccessAction implements Action {
  readonly type = ScopingActionTypes.SET_ESTIMATE_SUCCESS;
  constructor(public payload?: any) {}
}

export class SetEstimateErrorAction implements Action {
  readonly type = ScopingActionTypes.SET_ESTIMATE_ERROR;
  constructor(public payload: { message: string }) {}
}

export type ScopingActions =
  | LoadSessionAction
  | LoadSessionSuccessAction
  | LoadSessionErrorAction
  | VoteAction
  | VoteSuccessAction
  | VoteErrorAction
  | SetEstimateAction
  | SetEstimateSuccessAction
  | SetEstimateErrorAction;
