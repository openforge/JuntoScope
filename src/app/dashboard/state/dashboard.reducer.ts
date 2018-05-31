import { createSelector, createFeatureSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import {
  DashboardActions,
  DashboardActionTypes,
} from '../state/dashboard.actions';
import { HistoryItem } from '../../../models/history-item';

export enum DashboardUiState {
  LOADING = 'Loading',
  LOADED = 'Loaded',
  NOT_LOADED = 'Not Loaded',
}

export interface DashboardState extends EntityState<HistoryItem> {
  uiState: DashboardUiState;
}

export const adapter: EntityAdapter<HistoryItem> = createEntityAdapter<
  HistoryItem
>();

export const initialDashboardState: DashboardState = adapter.getInitialState({
  uiState: DashboardUiState.NOT_LOADED,
});

export function dashboardReducer(
  state = initialDashboardState,
  action: DashboardActions
): DashboardState {
  switch (action.type) {
    case DashboardActionTypes.LOAD_HISTORY: {
      return adapter.removeAll({ ...state, uiState: DashboardUiState.LOADING });
    }

    case DashboardActionTypes.LOAD_MORE_HISTORY: {
      return {
        ...state,
        uiState: DashboardUiState.LOADING,
      };
    }

    case DashboardActionTypes.NO_HISTORY: {
      return {
        ...state,
        uiState: DashboardUiState.LOADED,
      };
    }

    case DashboardActionTypes.ADDED: {
      return adapter.upsertOne(action.payload.historyItem, {
        ...state,
        uiState: DashboardUiState.LOADED,
      });
    }

    case DashboardActionTypes.MODIFIED: {
      return adapter.updateOne(action.payload.update, state);
    }

    case DashboardActionTypes.REMOVED: {
      return adapter.removeOne(action.payload.historyItem.id, state);
    }

    default: {
      return state;
    }
  }
}

export namespace DashboardQuery {
  const selectSlice = createFeatureSelector<DashboardState>('dashboard');
  export const { selectIds, selectEntities, selectAll } = adapter.getSelectors(
    selectSlice
  );
  export const selectUiState = createSelector(
    selectSlice,
    state => state.uiState
  );
}
