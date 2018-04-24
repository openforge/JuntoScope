import { Action } from '@ngrx/store';

import { User } from '@models/user';

export enum AuthActionTypes {
  GET_USER = '[Auth] Get User',
  AUTHENTICATED = '[Auth] User Authenticated',
  NOT_AUTHENTICATED = '[Auth] User not Authenticated',
  LOGIN = '[Auth] Login Attempt',
  AUTH_ERROR = '[Auth] Auth Error',
  LOGOUT = '[Auth] Logout',
}

export class GetUserAction implements Action {
  readonly type = AuthActionTypes.GET_USER;
}

export class AuthenticatedAction implements Action {
  readonly type = AuthActionTypes.AUTHENTICATED;
  constructor(public payload: User) {}
}

export class NotAuthenticatedAction implements Action {
  readonly type = AuthActionTypes.NOT_AUTHENTICATED;
}

export class LoginAction implements Action {
  readonly type = AuthActionTypes.LOGIN;
  constructor(public payload: { provider: string }) {}
}

export class AuthErrorAction implements Action {
  readonly type = AuthActionTypes.AUTH_ERROR;
  constructor(public payload: { message: string }) {}
}

export class LogoutAction implements Action {
  readonly type = AuthActionTypes.LOGOUT;
}

export type AuthActions =
  | GetUserAction
  | AuthenticatedAction
  | NotAuthenticatedAction
  | LoginAction
  | AuthErrorAction
  | LogoutAction;
