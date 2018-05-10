import { Action } from '@ngrx/store';
import { ScopingSession } from '@models/scoping-session';
import { Task } from '@models/task';

export enum ScopingActionTypes {
  VOTE = '[Scoping] Vote',
  VOTE_SUCCESS = '[Scoping] Vote Success',
  VOTE_ERROR = '[Scoping] Vote Error',
  VALIDATE_SESSION = '[Scoping] Validate Session',
  VALIDATE_PARTICIPANT = '[Scoping] Validate Participant',

  SESSION_VERIFIED = '[Scoping] Session Verified',
  SESSION_JOIN_ERROR = '[Scoping] Session Join Error',
  VALIDATE_PARTICIPANT_ERROR = '[Scoping] Validate Participant Error',
  PARTICIPANT_VALIDATED = '[Scoping] Participant Validated',
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
export class ValidateParticipantAction implements Action {
  readonly type = ScopingActionTypes.VALIDATE_PARTICIPANT;
  constructor(public payload: { uid: string; sessionLink: string }) {}
}

export class ParticipantValidatedAction implements Action {
  readonly type = ScopingActionTypes.PARTICIPANT_VALIDATED;
  constructor(public payload: any) {}
}

export class ValidateParticipantErrorAction implements Action {
  readonly type = ScopingActionTypes.VALIDATE_PARTICIPANT_ERROR;
  constructor(public payload: any) {}
}

export type ScopingActions =
  | ValidateParticipantAction
  | ParticipantValidatedAction
  | ValidateParticipantErrorAction;
