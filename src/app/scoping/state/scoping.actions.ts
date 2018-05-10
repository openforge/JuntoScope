import { Action } from '@ngrx/store';
import { SessionValidation } from '@models/scoping-session';

export enum ScopingActionTypes {
  VALIDATE_SESSION = '[Scoping] Validate Session',

  SESSION_VERIFIED = '[Scoping] Session Verified',
  SESSION_JOIN_ERROR = '[Scoping] Session Join Error',
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

export type ScopingActions =
  | ValidateSessionAction
  | SessionVerfiedAction
  | SessionJoinErrorAction;
