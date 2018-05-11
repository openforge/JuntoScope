import { Component, OnInit } from '@angular/core';

import { combineLatest } from 'rxjs';
import { map, tap, filter, switchMap, take } from 'rxjs/operators';

import * as _ from 'lodash';

import { RouterFacade } from '@app/state/router.facade';
import { ConnectionFacade } from '@app/connections/state/connection.facade';
import { TaskList } from '@models/task-list';

@Component({
  selector: 'app-select-task-list',
  templateUrl: './select-task-list.component.html',
  styleUrls: ['./select-task-list.component.scss'],
})
export class SelectTaskListComponent {
  taskLists$ = this.routerFacade.params$.pipe(
    tap(params =>
      this.connectionFacade.selectProject(params.connectionId, params.projectId)
    ),
    switchMap(params =>
      this.connectionFacade.selectedConnection$.pipe(
        filter(connection =>
          _.has(connection, `projects.${params.projectId}.taskLists`)
        ),
        map(connection =>
          Object.values(connection.projects[params.projectId].taskLists)
        )
      )
    )
  );

  selectedLists: { [taskListId: string]: boolean } = {};

  get taskListIds() {
    return _.invertBy(this.selectedLists)['true'];
  }

  constructor(
    private routerFacade: RouterFacade,
    private connectionFacade: ConnectionFacade
  ) {}

  handleToggle(checked: boolean, taskList: TaskList) {
    this.selectedLists[taskList.id] = checked;
  }

  startSession() {
    this.routerFacade.params$.pipe(take(1)).subscribe(params => {
      this.connectionFacade.createSession(
        params.connectionId,
        params.projectId,
        this.taskListIds
      );
    });
  }
}
