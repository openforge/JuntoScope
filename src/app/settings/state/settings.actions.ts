import { Action } from '@ngrx/store';

import { Faq } from '../../../models/faq';

export enum SettingsActionTypes {
  QUERY_FAQS = '[Settings] Query Faqs',

  SET_FAQS = '[Settings] Set Faqs',
  NO_FAQS = '[Settings] No Faqs Found',

  QUERY_FAQS_ERROR = '[Settings] Query Faqs Error',
}

export class QueryFaqsAction implements Action {
  readonly type = SettingsActionTypes.QUERY_FAQS;
}

export class SetFaqsAction implements Action {
  readonly type = SettingsActionTypes.SET_FAQS;
  constructor(public payload: Faq[]) {}
}

export class NoFaqsFoundAction implements Action {
  readonly type = SettingsActionTypes.NO_FAQS;
}

export class QueryFaqsErrorAction implements Action {
  readonly type = SettingsActionTypes.QUERY_FAQS_ERROR;
  constructor(public payload: { message: string }) {}
}

export type SettingsActions =
  | QueryFaqsAction
  | SetFaqsAction
  | NoFaqsFoundAction
  | QueryFaqsErrorAction;
