import { Component, OnInit } from "@angular/core";

import { combineLatest } from "rxjs";
import { map, tap, filter, switchMap, take } from "rxjs/operators";

import * as _ from "lodash";

import { RouterFacade } from "../../../../store/router.facade";
import { ConnectionFacade } from "../../store/connection.facade";
import { TaskList } from "../../../../models/task-list";
import { Connection } from "../../../../models/connection";
import { NavParams } from "ionic-angular";

@Component({
  selector: "app-select-task-list",
  templateUrl: "./select-task-list.component.html"
})
export class SelectTaskListComponent implements OnInit {
  connectionId: string;
  projectId: string;
  projectName: string;

  taskLists$ = this.connectionFacade.selectedConnection$.pipe(
    filter(connection =>
      _.has(connection, `projects.${this.projectId}.taskLists`)
    ),
    map((connection: Connection) =>
      Object.keys(connection.projects[this.projectId].taskLists).map(
        keys => connection.projects[this.projectId].taskLists[keys]
      )
    )
  );

  selectedLists: { [taskListId: string]: boolean } = {};

  get taskListIds() {
    return _.invertBy(this.selectedLists)["true"];
  }

  constructor(
    private routerFacade: RouterFacade,
    private connectionFacade: ConnectionFacade,
    private navParams: NavParams
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.connectionId = this.navParams.get("connectionId");
    this.projectId = this.navParams.get("projectId");
    this.projectName = this.navParams.get("projectName");
    this.connectionFacade.selectProject(this.connectionId, this.projectId);
  }

  handleToggle(checked: boolean, taskList: TaskList) {
    this.selectedLists[taskList.id] = checked;
  }

  startSession() {
    this.connectionFacade.createSession(
      this.connectionId,
      this.projectId,
      this.taskListIds
    );
  }
}
