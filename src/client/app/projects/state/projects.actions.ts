import { Action } from '@ngrx/store';

export enum ProjectsActionTypes {
  GET_PROJECTS = '[Projects] Get Projects',
  GET_PROJECTS_SUCCESS = '[Projects] Get Projects Success',
  GET_PROJECTS_FAIL = '[Projects] Get Projects Fail',

  IMPORT_PROJECTS = '[Projects] Import Projects',
  IMPORT_PROJECTS_SUCCESS = '[Projects] Import Projects Success',
  IMPORT_PROJECTS_FAIL = '[Projects] Import Projects Fail',
}

export class GetProjectsAction implements Action {
  readonly type = ProjectsActionTypes.GET_PROJECTS;
  constructor(public payload: string) {}
}

export class GetProjectsSuccessAction implements Action {
  readonly type = ProjectsActionTypes.GET_PROJECTS_SUCCESS;
  // Change payload type to Array; define projects model
  constructor(public payload: string) {}
}

export class GetProjectsFailAction implements Action {
  readonly type = ProjectsActionTypes.GET_PROJECTS_FAIL;
  constructor(public payload: { message: string }) {}
}

export class ImportProjectsAction implements Action {
  readonly type = ProjectsActionTypes.IMPORT_PROJECTS;
  constructor(public payload: string) {}
}

export class ImportProjectsSuccessAction implements Action {
  readonly type = ProjectsActionTypes.IMPORT_PROJECTS_SUCCESS;
  // Change payload type to Array; define projects model
  constructor(public payload: string) {}
}

export class ImportProjectsFailAction implements Action {
  readonly type = ProjectsActionTypes.IMPORT_PROJECTS_FAIL;
  constructor(public payload: { message: string }) {}
}

export type ProjectsActions =
  | GetProjectsAction
  | GetProjectsSuccessAction
  | GetProjectsFailAction
  | ImportProjectsAction
  | ImportProjectsSuccessAction
  | ImportProjectsFailAction;
