import { NavigationExtras, Params } from '@angular/router';

import { Action } from '@ngrx/store';

export interface NavigationOptions {
  path: any[];
  query?: Params;
  extras?: NavigationExtras;
}

export enum RouterActionTypes {
  GO = '[Router] Go',
  BACK = '[Router] Back',
  FORWARD = '[Router] Forward',
}

export class GoAction implements Action {
  readonly type = RouterActionTypes.GO;
  constructor(public payload: NavigationOptions) {}
}

export class BackAction implements Action {
  readonly type = RouterActionTypes.BACK;
}

export class ForwardAction implements Action {
  readonly type = RouterActionTypes.FORWARD;
}

export type RouterActions = GoAction | BackAction | ForwardAction;
