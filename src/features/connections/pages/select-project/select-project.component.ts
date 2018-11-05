import { Component, OnInit } from "@angular/core";
import { map, filter, find } from "rxjs/operators";
import { ConnectionFacade } from "../../store/connection.facade";
import { Project } from "../../../../models/project";
import { Connection } from "../../../../models/connection";
import { NavController, NavParams, IonicPage } from "ionic-angular";
import { FirebaseAnalytics } from "@ionic-native/firebase-analytics";

@IonicPage({
  segment: "SelectProjectPage",
  priority: "high"
})
@Component({
  selector: "app-select-project",
  templateUrl: "./select-project.component.html"
})
export class SelectProjectPage implements OnInit {
  connectionId: string;
  loaded: boolean = false;
  projects$ = this.connectionFacade.selectedConnection$.pipe(
    filter((connection: Connection) => !!connection && !!connection.projects),
    map((connection: Connection) => {
      this.loaded = true;

      return Object.keys(connection.projects).map(
        keys => connection.projects[keys]
      );
    })
  );

  connection$ = this.connectionFacade.selectConnection$.pipe(
    find(
      (connection: any) => connection.id == this.navParams.get("connectionId")
    )
  );

  constructor(
    private connectionFacade: ConnectionFacade,
    private navCtrl: NavController,
    private navParams: NavParams,
    private firebaseAnalytics: FirebaseAnalytics
  ) {}

  ngOnInit(): void {
    this.firebaseAnalytics.logEvent("page_view", { page: "SelectProjectPage" });
    this.connectionId = this.navParams.get("connectionId");
    this.connectionFacade.selectConnection(this.connectionId);
  }

  handleProjectSelect(project: Project) {
    this.navCtrl.push("SelectTaskListPage", {
      connectionId: this.connectionId,
      projectId: project.id,
      projectName: project.name
    });
  }
}
