import { Action } from '@ngrx/store';
import { ScopingSession } from '@models/scoping-session';
import { Task } from '@models/task';

export enum ScopingActionTypes {
  VOTE = '[Scoping] Vote',
  VOTE_SUCCESS = '[Scoping] Vote Success',
  VOTE_ERROR = '[Scoping] Vote Error',
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

export type VoteActions = VoteAction | VoteSuccessAction | VoteErrorAction;
