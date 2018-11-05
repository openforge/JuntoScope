import { Component, OnInit } from "@angular/core";
import { map, filter } from "rxjs/operators";
import * as _ from "lodash";
import { ConnectionFacade } from "../../store/connection.facade";
import { TaskList } from "../../../../models/task-list";
import { Connection } from "../../../../models/connection";
import { NavParams, IonicPage } from "ionic-angular";
import { LoadingService } from "../../../../shared/loading.service";
import { FirebaseAnalytics } from "@ionic-native/firebase-analytics";

@IonicPage({
  segment: "SelectTaskListPage",
  priority: "high"
})
@Component({
  selector: "app-select-task-list",
  templateUrl: "./select-task-list.component.html"
})
export class SelectTaskListPage implements OnInit {
  connectionId: string;
  projectId: string;
  projectName: string;
  loaded: boolean = false;

  taskLists$ = this.connectionFacade.selectedConnection$.pipe(
    filter(connection => {
      return _.has(connection, `projects.${this.projectId}.taskLists`);
    }),
    map((connection: Connection) => {
      this.loaded = true;

      return Object.keys(connection.projects[this.projectId].taskLists).map(
        keys => connection.projects[this.projectId].taskLists[keys]
      );
    })
  );

  selectedLists: { [taskListId: string]: boolean } = {};

  get taskListIds() {
    return _.invertBy(this.selectedLists)["true"];
  }

  constructor(
    private connectionFacade: ConnectionFacade,
    private loadingSrv: LoadingService,
    private navParams: NavParams,
    private firebaseAnalytics: FirebaseAnalytics
  ) {}

  ngOnInit(): void {
    this.firebaseAnalytics.logEvent("page_view", {
      page: "SelectTaskListPage"
    });
    this.connectionId = this.navParams.get("connectionId");
    this.projectId = this.navParams.get("projectId");
    this.projectName = this.navParams.get("projectName");
    this.connectionFacade.selectProject(this.connectionId, this.projectId);
  }

  handleToggle(checked: boolean, taskList: TaskList) {
    this.selectedLists[taskList.id] = checked;
  }

  startSession() {
    this.loadingSrv.present();
    this.connectionFacade.createSession(
      this.connectionId,
      this.projectId,
      this.taskListIds,
      this.projectName
    );
  }
}
