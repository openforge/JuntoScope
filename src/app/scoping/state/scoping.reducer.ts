import { createSelector, createFeatureSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import {
  ScopingActions,
  ScopingActionTypes,
} from '@app/scoping/state/scoping.actions';
import { ScopingSession } from '@models/scoping-session';
import { AppState } from '@app/state/app.reducer';

export interface ScopingState {
  error: string;
}

export const initialScopingSessionState: ScopingState = {
  error: null,
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

    default: {
      return state;
    }
  }
}

export namespace ScopingQuery {
  const getSlice = (state: AppState) => state.scoping;
  export const selectError = createSelector(getSlice, state => state.error);
}
