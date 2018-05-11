import { Action } from '@ngrx/store';

import { HistoryItem } from '@models/history-item';

export enum DashboardActionTypes {
  LOAD_HISTORY = '[Dashboard] Load History Items',
  LOAD_MORE_HISTORY = '[Dashboard] Load More History Items',
  NO_HISTORY = '[Dashboard] No History Items',

  ADDED = '[Dashboard] History Item Added',
  MODIFIED = '[Dashboard] History Item Modified',
  REMOVED = '[Dashboard] History Item Removed',

  REFRESH_ACCESS_CODE = '[Dashboard] Refresh Access Code',
  REFRESH_ACCESS_CODE_SUCCESS = '[Dashboard] Refresh Access Code Success',
  REFRESH_ACCESS_CODE_ERROR = '[Dashboard] Refresh Access Code Error',

}

export class LoadHistoryItemsAction implements Action {
  readonly type = DashboardActionTypes.LOAD_HISTORY;
}

export class LoadMoreHistoryItemsAction implements Action {
  readonly type = DashboardActionTypes.LOAD_MORE_HISTORY;
}

export class NoHistoryItemsAction implements Action {
  readonly type = DashboardActionTypes.NO_HISTORY;
}

export class AddedHistoryItemAction implements Action {
  readonly type = DashboardActionTypes.ADDED;
  constructor(public payload: { historyItem: HistoryItem }) {}
}

export class ModifiedHistoryItemAction implements Action {
  readonly type = DashboardActionTypes.MODIFIED;
  constructor(
    public payload: { update: { id: string; changes: Partial<HistoryItem> } }
  ) {}
}

export class RemovedHistoryItemAction implements Action {
  readonly type = DashboardActionTypes.REMOVED;
  constructor(public payload: { historyItem: HistoryItem }) {}
}

export class RefreshAccessCodeAction implements Action {
  readonly type = DashboardActionTypes.REFRESH_ACCESS_CODE;
  constructor(public sessionCode: any) {}
}

export class RefreshAccessCodeSuccessAction implements Action {
  readonly type = DashboardActionTypes.REFRESH_ACCESS_CODE_SUCCESS;
  constructor(public payload?: any) {}
}

export class RefreshAccessCodeErrorAction implements Action {
  readonly type = DashboardActionTypes.REFRESH_ACCESS_CODE_ERROR;
  constructor(public payload?: any) {}
}
export type DashboardActions =
  | LoadHistoryItemsAction
  | LoadMoreHistoryItemsAction
  | NoHistoryItemsAction
  | AddedHistoryItemAction
  | ModifiedHistoryItemAction
  | RemovedHistoryItemAction
  | RefreshAccessCodeAction
  | RefreshAccessCodeSuccessAction
  | RefreshAccessCodeErrorAction;
