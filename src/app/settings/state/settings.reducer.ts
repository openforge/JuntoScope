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

import { Faq } from '@models/faq';
import { Connection } from '@models/connection';

export const adapter: EntityAdapter<Faq> = createEntityAdapter<Faq>();
export interface State extends EntityState<Faq> {}

export const initialState: State = adapter.getInitialState();

export function settingsReducer(
  state = initialState,
  action: SettingsActions
): State {
  switch (action.type) {
    case SettingsActionTypes.ADDED:
      return adapter.addOne(action.payload, state);

    case SettingsActionTypes.MODIFIED:
      return adapter.updateOne(
        {
          id: action.payload.id,
          changes: action.payload,
        },
        state
      );

    default: {
      return state;
    }
  }
}

export namespace SettingsQuery {
  const selectSlice = createFeatureSelector<State>('settings');
  export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
  } = adapter.getSelectors(selectSlice);
}
