import { createSelector, createFeatureSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { AppState } from '../../state/app.reducer';

import {
  ConnectionActions,
  ConnectionActionTypes,
} from '@app/connections/state/connection.actions';

import {
  SettingsActions,
  SettingsActionTypes,
} from '@app/settings/state/settings.actions';

import { Faq } from '../../../models/faq';
import { Connection } from '@models/connection';

export interface SettingsState extends EntityState<Faq> {
  faqs: any[];
  error: string;
}

export const adapter: EntityAdapter<Faq> = createEntityAdapter<Faq>();

export const initialSettingsState: SettingsState = adapter.getInitialState({
  faqs: null,
  error: null,
});

export function settingsReducer(
  state = initialSettingsState,
  action: SettingsActions
): SettingsState {
  switch (action.type) {
    case SettingsActionTypes.SET_FAQS: {
      return {
        ...state,
        faqs: action.payload,
      };
    }

    case SettingsActionTypes.QUERY_FAQS_ERROR: {
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

export namespace SettingsQuery {
  const selectSlice = createFeatureSelector<SettingsState>('settings');
  export const { selectIds, selectEntities, selectAll } = adapter.getSelectors(
    selectSlice
  );
  export const selectFaqs = createSelector(selectSlice, state => state.faqs);
}
