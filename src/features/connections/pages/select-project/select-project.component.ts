import { Component, OnInit } from "@angular/core";

import {
  map,
  tap,
  filter,
  switchMap,
  take,
  pluck,
  distinctUntilChanged
} from "rxjs/operators";

import { RouterFacade } from "../../../../store/router.facade";
import { ConnectionFacade } from "../../store/connection.facade";
// import { ActivatedRoute, Params } from "@angular/router";
import { Project } from "../../../../models/project";

import { Connection } from "../../../../models/connection";
import { NavController, NavParams } from "ionic-angular";
import { SelectTaskListComponent } from "../select-task-list/select-task-list.component";

@Component({
  selector: "app-select-project",
  templateUrl: "./select-project.component.html"
})
export class SelectProjectComponent implements OnInit {
  connectionId: string;
  projects$ = this.connectionFacade.selectedConnection$.pipe(
    filter((connection: Connection) => !!connection && !!connection.projects),
    map((connection: Connection) =>
      Object.keys(connection.projects).map(keys => connection.projects[keys])
    )
  );
  // projects$ = this.routerFacade.params$.pipe(
  //   pluck("connectionId"),
  //   distinctUntilChanged(),
  //   tap((connectionId: string) =>
  //     this.connectionFacade.selectConnection(connectionId)
  //   ),
  //   switchMap(params =>
  //     this.connectionFacade.selectedConnection$.pipe(
  //       filter(
  //         (connection: Connection) => !!connection && !!connection.projects
  //       ),
  //       map((connection: Connection) =>
  //         Object.keys(connection.projects).map(
  //           keys => connection.projects[keys]
  //         )
  //       )
  //     )
  //   )
  // );

  constructor(
    private routerFacade: RouterFacade,
    private connectionFacade: ConnectionFacade,
    // private route: ActivatedRoute,
    private navCtrl: NavController,
    private navParams: NavParams
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.connectionId = this.navParams.get("connectionId");
    console.log("Connection id: ", this.connectionId);
    this.connectionFacade.selectConnection(this.connectionId);
  }

  handleProjectSelect(project: Project) {
    // this.routerFacade.params$.pipe(take(1)).subscribe(params => {
    //   this.routerFacade.navigate({
    //     path: [`/connections/${params.connectionId}/projects/${project.id}`]
    //   });
    //   this.navCtrl.push(SelectTaskListComponent);
    // });
  }
}
