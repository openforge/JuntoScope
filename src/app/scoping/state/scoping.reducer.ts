import { createSelector, createFeatureSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import {
  ScopingActions,
  ScopingActionTypes,
} from '@app/scoping/state/scoping.actions';
import { ScopingSession } from '@models/scoping-session';
import { AppState } from '@app/state/app.reducer';

export enum ScopingUiState {
  CHECKING_PARTICIPANT = 'Checking',
  PARTICIPANT_VALIDATED = 'Validated',
  PARTICIPANT_INVALID = 'Invalid',
}

export interface ScopingState {
  uiState: ScopingUiState;
  error: string;
}

export const initialScopingSessionState: ScopingState = {
  error: null,
  uiState: ScopingUiState.CHECKING_PARTICIPANT,
};

export function scopingReducer(
  state = initialScopingSessionState,
  action: ScopingActions
): ScopingState {
  switch (action.type) {
    case ScopingActionTypes.SESSION_JOIN_ERROR: {
      return {
        ...state,
        error: action.payload.message,
      };
    }

    case ScopingActionTypes.VALIDATE_PARTICIPANT_ERROR: {
      return {
        ...state,
        uiState: ScopingUiState.PARTICIPANT_INVALID,
      };
    }

    case ScopingActionTypes.PARTICIPANT_VALIDATED: {
      return {
        ...state,
        uiState: ScopingUiState.PARTICIPANT_VALIDATED,
      };
    }

    default: {
      return state;
    }
  }
}

export namespace ScopingQuery {
  const getSlice = (state: AppState) => state.scoping;
  export const selectUiState = createSelector(getSlice, state => state.uiState);
  export const selectError = createSelector(getSlice, state => state.error);
}
