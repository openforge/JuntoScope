import * as fromConnections from './connection.reducer';
import * as actions from './connection.actions';
import { Connection } from '../../../models/connection';
import { Actions } from '@ngrx/effects';

describe('ConnectionsReducer', () => {
  let action;

  describe('Undefined action', () => {
    it('Should return the default state', () => {
      const initialState = fromConnections.initialConnectionState;
      action = { type: null };
      const state = fromConnections.connectionReducer(undefined, action);

      expect(state).toBe(initialState);
    });
  });
  describe('SelectedAction', () => {
    it('Should handle Selected Actions', () => {
      const payload = {
        connectionId: 'd3j887',
      };
      action = new actions.SelectedConnectionAction(payload);

      const state = fromConnections.connectionReducer(undefined, action);

      expect(state.selectedId).toEqual(payload.connectionId);
    });
  });

  describe('Selected Project', () => {
    it('Should handle Selected Project Actions', () => {
      const payload = {
        connection: {
          id: 'd3j887',
          type: '',
          token: '',
          externalData: {},
          projects: {
            '': {
              id: 'asdf',
              name: '',
              taskLists: {},
            },
          },
        },

        project: {
          id: 'h87290',
          name: '',
          taskLists: {},
        },
      };

      action = new actions.SelectedProjectAction(payload);

      const state = fromConnections.connectionReducer(undefined, action);

      expect(state.selectedId).toEqual(payload.connection.id);
      expect(state.selectedProjectId).toEqual(payload.project.id);
    });
  });

  describe('Query All', () => {
    it('Should handle Query All actions', () => {
      action = new actions.QueryConnectionsAction();

      const state = fromConnections.connectionReducer(undefined, action);

      expect(state.uiState).toEqual(fromConnections.ConnectionUiState.LOADING);
    });
  });

  describe('No Connections', () => {
    it('Should handle No Connections actions', () => {
      action = new actions.NoConnectionsAction();

      const state = fromConnections.connectionReducer(undefined, action);

      expect(state.uiState).toEqual(fromConnections.ConnectionUiState.LOADED);
    });
  });

  describe('Modified', () => {
    it('Should handle Modified Connection actions', () => {
      const payload = {
        update: {
          id: 'originalId',
          changes: {
            id: 'modifiedId',
            type: '',
            token: '',
            externalData: {},
            projects: {
              '': {
                id: 'projectIdChanged',
                name: '',
                taskLists: {},
              },
            },
          },
        },
      };

      action = new actions.ModifiedConnectionAction(payload);

      const state = fromConnections.connectionReducer(undefined, action);
    });
  });

  describe('Add, Added, and Removed Connection actions', () => {
    let payload;

    beforeEach(() => {
      payload = {
        connection: {
          id: 'd3j887',
          type: '',
          token: '',
          externalData: {},
          projects: {
            '': {
              id: 'asdf',
              name: '',
              taskLists: {},
            },
          },
        },
      };
    });

    it('Should handle Add Connection action', () => {
      action = new actions.AddConnectionAction(payload);

      const state = fromConnections.connectionReducer(undefined, action);

      expect(state.uiState).toEqual(fromConnections.ConnectionUiState.ADDING);
    });

    it('Should handle Added actions', () => {
      action = new actions.AddedConnectionAction(payload);
      const state = fromConnections.connectionReducer(undefined, action);
      expect(state.uiState).toEqual(fromConnections.ConnectionUiState.LOADED);
    });

    it('Should handle Removed Connection actions', () => {
      payload = {
        connection: {
          id: 'd3j887',
          type: '',
          token: '',
          externalData: {},
          projects: {
            '': {
              id: 'asdf',
              name: '',
              taskLists: {},
            },
          },
        },
      };

      action = new actions.RemovedConnectionAction(payload);
      const state = fromConnections.connectionReducer(undefined, action);
    });
  });

  describe('Add Error action', () => {
    it('Should handle add error action by updating the state with an error', () => {
      const payload = {
        message: 'Error!',
      };

      action = new actions.AddConnectionErrorAction(payload);

      const state = fromConnections.connectionReducer(undefined, action);

      expect(state.error).toEqual(payload.message);
      expect(state.uiState).toEqual(
        fromConnections.ConnectionUiState.ADD_ERROR
      );
    });
  });
});
