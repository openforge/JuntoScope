import { Action } from '@ngrx/store';

import { Faq } from '@models/faq';

export enum SettingsActionTypes {
  QUERY = '[Settings] Query Faqs',

  ADDED = '[Settings] added',
  MODIFIED = '[Settings] modified',
  REMOVED = '[Settings] removed',

  QUERY_FAQS_ERROR = '[Settings] Query Faqs Error',
}

export class QueryFaqsAction implements Action {
  readonly type = SettingsActionTypes.QUERY;
  constructor() {}
}

export class AddedFaqAction implements Action {
  readonly type = SettingsActionTypes.ADDED;
  constructor(public payload: Faq) {}
}

export class ModifiedFaqAction implements Action {
  readonly type = SettingsActionTypes.MODIFIED;
  constructor(public payload: Faq) {}
}

export class RemovedFaqAction implements Action {
  readonly type = SettingsActionTypes.REMOVED;
  constructor(public payload: Faq) {}
}

export class QueryFaqsErrorAction implements Action {
  readonly type = SettingsActionTypes.QUERY_FAQS_ERROR;
  constructor(public payload: { message: string }) {}
}

export type SettingsActions =
  | QueryFaqsAction
  | AddedFaqAction
  | ModifiedFaqAction
  | RemovedFaqAction
  | QueryFaqsErrorAction;
