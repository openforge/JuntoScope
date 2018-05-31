import { createSelector, createFeatureSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { ConnectionActions, ConnectionActionTypes } from './connection.actions';
import { Connection } from '../../../models/connection';

export enum ConnectionUiState {
  LOADING = 'Loading',
  ADDING = 'Adding',
  ADD_ERROR = 'Error adding',
  LOADED = 'Loaded',
  NOT_LOADED = 'Not Loaded',
}

export interface ConnectionState extends EntityState<Connection> {
  uiState: ConnectionUiState;
  error: string;
  selectedId: string;
  selectedProjectId: string;
}

export const adapter: EntityAdapter<Connection> = createEntityAdapter<
  Connection
>();

export const initialConnectionState: ConnectionState = adapter.getInitialState({
  uiState: ConnectionUiState.NOT_LOADED,
  error: null,
  selectedId: null,
  selectedProjectId: null,
});

export function connectionReducer(
  state = initialConnectionState,
  action: ConnectionActions
): ConnectionState {
  switch (action.type) {
    case ConnectionActionTypes.SELECTED: {
      return { ...state, selectedId: action.payload.connectionId };
    }

    case ConnectionActionTypes.SELECTED_PROJECT: {
      return {
        ...state,
        selectedId: action.payload.connection.id,
        selectedProjectId: action.payload.project.id,
      };
    }

    case ConnectionActionTypes.QUERY_ALL: {
      return { ...state, uiState: ConnectionUiState.LOADING };
    }

    case ConnectionActionTypes.NO_CONNECTIONS: {
      return { ...state, uiState: ConnectionUiState.LOADED };
    }

    case ConnectionActionTypes.ADDED: {
      return adapter.addOne(action.payload.connection, {
        ...state,
        uiState: ConnectionUiState.LOADED,
      });
    }

    case ConnectionActionTypes.MODIFIED: {
      return adapter.updateOne(action.payload.update, state);
    }

    case ConnectionActionTypes.REMOVED: {
      return adapter.removeOne(action.payload.connection.id, state);
    }

    case ConnectionActionTypes.ADD: {
      return { ...state, uiState: ConnectionUiState.ADDING };
    }

    case ConnectionActionTypes.ADD_ERROR: {
      return {
        ...state,
        uiState: ConnectionUiState.ADD_ERROR,
        error: action.payload.message,
      };
    }

    default: {
      return state;
    }
  }
}

export namespace ConnectionQuery {
  const selectSlice = createFeatureSelector<ConnectionState>('connection');
  export const { selectIds, selectEntities, selectAll } = adapter.getSelectors(
    selectSlice
  );
  export const selectUiState = createSelector(
    selectSlice,
    state => state.uiState
  );
  export const selectError = createSelector(selectSlice, state => state.error);
  export const selectSelectedId = createSelector(
    selectSlice,
    state => state.selectedId
  );
  export const selectSelectedConnection = createSelector(
    selectSelectedId,
    selectEntities,
    (id, entities) => entities[id]
  );
  export const selectProjectId = createSelector(
    selectSlice,
    state => state.selectedProjectId
  );

  export const selectProject = createSelector(
    selectProjectId,
    selectSelectedConnection,
    (projectId, connection) =>
      connection && projectId && connection.projects[projectId]
  );
}
