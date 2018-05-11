import { createSelector, createFeatureSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { AppState } from '@app/state/app.reducer';

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

export enum ParticipantState {
  CHECKING_PARTICIPANT = 'Checking',
  PARTICIPANT_VALIDATED = 'Validated',
  PARTICIPANT_INVALID = 'Invalid',
}

export interface ScopingState extends EntityState<ScopingSession> {
  uiState: ScopingUiState;
  participantState: ParticipantState;
  error: string;
}

export const adapter: EntityAdapter<ScopingSession> = createEntityAdapter<
  ScopingSession
>();

export const initialScopingState: ScopingState = adapter.getInitialState({
  uiState: ScopingUiState.NOT_LOADED,
  participantState: ParticipantState.CHECKING_PARTICIPANT,
  error: null,
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

    case ScopingActionTypes.SESSION_VERIFIED: {
      return {
        ...state,
        participantState: ParticipantState.PARTICIPANT_VALIDATED,
      };
    }

    case ScopingActionTypes.SESSION_JOIN_ERROR: {
      return {
        ...state,
        error: action.payload.message,
      };
    }

    case ScopingActionTypes.VALIDATE_PARTICIPANT: {
      return {
        ...state,
        participantState: ParticipantState.CHECKING_PARTICIPANT,
      };
    }

    case ScopingActionTypes.VALIDATE_PARTICIPANT_ERROR: {
      return {
        ...state,
        participantState: ParticipantState.PARTICIPANT_INVALID,
      };
    }

    case ScopingActionTypes.PARTICIPANT_VALIDATED: {
      return {
        ...state,
        participantState: ParticipantState.PARTICIPANT_VALIDATED,
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
  export const selectParticipantState = createSelector(
    selectSlice,
    state => state.participantState
  );
  export const selectError = createSelector(selectSlice, state => state.error);
}
