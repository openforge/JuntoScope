import { Action } from '@ngrx/store';
import { SessionValidation } from '@models/scoping-session';

export enum ScopingActionTypes {
  VALIDATE_SESSION = '[Scoping] Validate Session',
  VALIDATE_PARTICIPANT = '[Scoping] Validate Participant',

  SESSION_VERIFIED = '[Scoping] Session Verified',
  SESSION_JOIN_ERROR = '[Scoping] Session Join Error',
  VALIDATE_PARTICIPANT_ERROR = '[Scoping] Validate Participant Error',
  PARTICIPANT_VALIDATED = '[Scoping] Participant Validated',
}

export class ValidateSessionAction implements Action {
  readonly type = ScopingActionTypes.VALIDATE_SESSION;
  constructor(public payload: { sessionValidation: SessionValidation }) {}
}

export class SessionVerfiedAction implements Action {
  readonly type = ScopingActionTypes.SESSION_VERIFIED;
  constructor(public payload: { sessionLink: string }) {}
}

export class SessionJoinErrorAction implements Action {
  readonly type = ScopingActionTypes.SESSION_JOIN_ERROR;
  constructor(public payload: any) {}
}

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
  | ValidateSessionAction
  | SessionVerfiedAction
  | SessionJoinErrorAction
  | ValidateParticipantAction
  | ParticipantValidatedAction
  | ValidateParticipantErrorAction;
