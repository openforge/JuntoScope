import * as actions from './connection.actions';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Action } from '@ngrx/store';
import { Connection } from '../../../models/connection';
import { Project } from '../../../models/project';

describe('Connection Actions', () => {
  let action;
  let payload;

  it('Should create a QueryConnectionsAction', () => {
    action = new actions.QueryConnectionsAction();

    expect(action instanceof actions.QueryConnectionsAction).toBeTruthy();
    expect({ ...action }).toEqual({
      type: actions.ConnectionActionTypes.QUERY_ALL,
    });
  });

  it('Should create a NoConnectionsAction', () => {
    action = new actions.NoConnectionsAction();

    expect(action instanceof actions.NoConnectionsAction).toBeTruthy();
    expect({ ...action }).toEqual({
      type: actions.ConnectionActionTypes.NO_CONNECTIONS,
    });
  });

  it('Should create a AddedConnectionAction with a connection as the payload', () => {
    payload = {
      id: '',
      type: '',
      token: '',
      externalData: {},
      projects: { '': {} },
    };

    action = new actions.AddedConnectionAction(payload);

    expect(action instanceof actions.AddedConnectionAction).toBeTruthy();
    expect({ ...action }).toEqual({
      type: actions.ConnectionActionTypes.ADDED,
      payload,
    });
  });

  it('Should create a ModifiedConnectionAction with the updated connection as a payload', () => {
    payload = {
      update: {
        id: '',
        changes: {
          id: '',
          type: '',
          token: '',
          externalData: {},
          projects: { '': {} },
        },
      },
    };

    action = new actions.ModifiedConnectionAction(payload);

    expect(action instanceof actions.ModifiedConnectionAction).toBeTruthy();
    expect({ ...action }).toEqual({
      type: actions.ConnectionActionTypes.MODIFIED,
      payload,
    });
  });

  it('Should crate a RemovedConnectionAction with a connection as the payload', () => {
    payload = {
      id: '',
      type: '',
      token: '',
      externalData: {},
      projects: { '': {} },
    };

    action = new actions.RemovedConnectionAction(payload);

    expect(action instanceof actions.RemovedConnectionAction).toBeTruthy();
    expect({ ...action }).toEqual({
      type: actions.ConnectionActionTypes.REMOVED,
      payload,
    });
  });

  it('Should create a AddConnectionAction with a connection as a payload', () => {
    payload = {
      id: '',
      type: '',
      token: '',
      externalData: {},
      projects: { '': {} },
    };

    action = new actions.AddConnectionAction(payload);

    expect(action instanceof actions.AddConnectionAction).toBeTruthy();
    expect({ ...action }).toEqual({
      type: actions.ConnectionActionTypes.ADD,
      payload,
    });
  });

  it('Should create a AddConnectionErrorAction with an error message for a payload', () => {
    payload = {
      message: 'Error',
    };

    action = new actions.AddConnectionErrorAction(payload);

    expect(action instanceof actions.AddConnectionErrorAction).toBeTruthy();
    expect({ ...action }).toEqual({
      type: actions.ConnectionActionTypes.ADD_ERROR,
      payload,
    });
  });

  it('Should create a SelectedConnectionAction with a connectionId as a payload', () => {
    payload = { connectionId: '' };

    action = new actions.SelectedConnectionAction(payload);

    expect(action instanceof actions.SelectedConnectionAction).toBeTruthy();
    expect({ ...action }).toEqual({
      type: actions.ConnectionActionTypes.SELECTED,
      payload,
    });
  });

  it('Should create a SelectedProjectAction with a connection and a project as a payload', () => {
    payload = {
      connection: {
        id: '',
        type: '',
        token: '',
        externalData: {},
        projects: { '': {} },
      },
      project: {
        id: '',
        name: '',
        taskLists: {
          '': {
            id: '',
            name: '',
          },
        },
      },
    };

    action = new actions.SelectedProjectAction(payload);

    expect(action instanceof actions.SelectedProjectAction).toBeTruthy();
    expect({ ...action }).toEqual({
      type: actions.ConnectionActionTypes.SELECTED_PROJECT,
      payload,
    });
  });

  it('Should create a CreateSessionAction with a payload', () => {
    payload = {
      connectionId: '',
      projectId: '',
      taskListIds: [],
    };

    action = new actions.CreateSessionAction(payload);

    expect({ ...action }).toEqual({
      type: actions.ConnectionActionTypes.CREATE_SESSION,
      payload,
    });
  });
});
