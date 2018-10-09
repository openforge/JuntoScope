import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { AngularFirestore } from "angularfire2/firestore";

import {
  switchMap,
  map,
  takeUntil,
  filter,
  mergeMap,
  concatMap
} from "rxjs/operators";

import * as _ from "lodash";

import { environment } from "../../../environments/environment";
import { Project } from "../../../models/project";
import { TaskList } from "../../../models/task-list";
import { Connection } from "../../../models/connection";
import { AppFacade } from "../../../store/app.facade";
import { AuthFacade } from "../../authentication/store/auth.facade";
import { AuthUiState } from "../../authentication/store/auth.reducer";
import { Task } from "../../../models/task";
import { forkJoin } from "rxjs";

@Injectable()
export class ConnectionService {
  authState$ = this.authFacade.uiState$;

  constructor(
    private appFacade: AppFacade,
    private afs: AngularFirestore,
    private http: HttpClient,
    private authFacade: AuthFacade
  ) {}

  addConnection(connection: Connection) {
    return this.http.post(`${environment.apiBaseUrl}/connections`, connection);
  }

  teamworkAuth(code: string) {
    // This can change depending on the api route
    return this.http.post(`${environment.apiBaseUrl}/connections/`, {
      token: code,
      type: "teamwork"
    });
  }

  deleteConnection(connectionId: string) {
    return this.http.delete(
      `${environment.apiBaseUrl}/connections/${connectionId}`
    );
  }

  getProjects(connectionId: string) {
    return this.http
      .get<{ projects: Project[] }>(
        `${environment.apiBaseUrl}/connections/${connectionId}/projects/`
      )
      .pipe(map(response => _.keyBy(response.projects, "id")));
  }

  getTaskLists(connectionId: string, projectId: string) {
    console.log("getting the task lists");
    return this.http
      .get<{ taskLists: TaskList[] }>(
        `${
          environment.apiBaseUrl
        }/connections/${connectionId}/projects/${projectId}/taskLists`
      )
      .pipe(
        map(response => {
          return _.keyBy(response.taskLists, "id");
        })
      );
  }

  getTasks(connectionId: string, projectId: string, taskListId: string) {
    console.log("getting the tasks");
    return this.http
      .get<{ tasks: Task[] }>(
        `${
          environment.apiBaseUrl
        }/connections/${connectionId}/projects/${projectId}/taskLists/${taskListId}`
      )
      .pipe(
        map(response => {
          console.log(response.tasks);
          return Object.keys(response.tasks).map(function(key) {
            return response.tasks[key];
          });
        })
      );
  }

  getConnections() {
    const userLogout$ = this.authState$.pipe(
      filter(authState => {
        return authState === AuthUiState.NOT_AUTHENTICATED;
      })
    );

    return this.appFacade.connectionsClnPath$.pipe(
      switchMap(clnPath => this.afs.collection(clnPath).stateChanges()),
      takeUntil(userLogout$)
    );
  }

  createSession(
    connectionId: string,
    projectId: string,
    taskListIds: string[],
    projectName: string
  ) {
    return this.http.post<{ sessionCode: string; accessCode: string }>(
      `${
        environment.apiBaseUrl
      }/connections/${connectionId}/projects/${projectId}/sessions`,
      { taskListIds, projectName }
    );
  }
}
