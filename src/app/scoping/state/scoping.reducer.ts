import { createSelector, createFeatureSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import {
  ScopingActions,
  ScopingActionTypes,
} from '@app/scoping/state/scoping.actions';
import { ScopingSession } from '@models/scoping-session';

export enum ScopingUiState {
  LOADING = 'Loading',
  LOADED = 'Loaded',
  NOT_LOADED = 'Not Loaded',
  VOTING = 'Voting',
  VOTED = 'Voted',
  SETTING_ESTIMATE = 'Setting Estimate',
  ESTIMATE_SET = 'Estimate Set',
}

export interface ScopingState extends EntityState<ScopingSession> {
  uiState: ScopingUiState;
}

export const adapter: EntityAdapter<ScopingSession> = createEntityAdapter<
  ScopingSession
>();

export const initialScopingState: ScopingState = adapter.getInitialState({
  uiState: ScopingUiState.NOT_LOADED,
});

export function scopingReducer(
  state = initialScopingState,
  action: ScopingActions
): ScopingState {
  switch (action.type) {
    case ScopingActionTypes.LOAD_SESSION: {
      return adapter.removeAll({ ...state, uiState: ScopingUiState.LOADING });
    }

    case ScopingActionTypes.LOAD_SESSION_SUCCESS: {
      return adapter.upsertOne(action.payload, {
        ...state,
        uiState: ScopingUiState.LOADED,
      });
    }

    case ScopingActionTypes.VOTE: {
      return {
        ...state,
        uiState: ScopingUiState.VOTING,
      };
    }

    case ScopingActionTypes.VOTE_SUCCESS: {
      return {
        ...state,
        uiState: ScopingUiState.VOTED,
      };
    }

    case ScopingActionTypes.SET_ESTIMATE: {
      return {
        ...state,
        uiState: ScopingUiState.SETTING_ESTIMATE,
      };
    }

    case ScopingActionTypes.SET_ESTIMATE_SUCCESS: {
      return {
        ...state,
        uiState: ScopingUiState.ESTIMATE_SET,
      };
    }

    default: {
      return state;
    }
  }
}

export namespace ScopingQuery {
  const selectSlice = createFeatureSelector<ScopingState>('scoping');
  export const { selectIds, selectEntities, selectAll } = adapter.getSelectors(
    selectSlice
  );
  export const selectUiState = createSelector(
    selectSlice,
    state => state.uiState
  );
}
