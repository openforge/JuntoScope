import { Action } from '@ngrx/store';

import { HistoryItem } from '@models/history-item';

export enum DashboardActionTypes {
  LOAD_HISTORY = '[Dashboard] Load History Items',
  LOAD_MORE_HISTORY = '[Dashboard] Load More History Items',
  NO_HISTORY = '[Dashboard] No History Items',

  ADDED = '[Dashboard] History Item Added',
  MODIFIED = '[Dashboard] History Item Modified',
  REMOVED = '[Dashboard] History Item Removed',
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

export type DashboardActions =
  | LoadHistoryItemsAction
  | LoadMoreHistoryItemsAction
  | NoHistoryItemsAction
  | AddedHistoryItemAction
  | ModifiedHistoryItemAction
  | RemovedHistoryItemAction;
