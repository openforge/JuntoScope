import { Component } from "@angular/core";

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
import { ActivatedRoute } from "@angular/router";
import { Project } from "../../../../models/project";

import { Connection } from "../../../../models/connection";

@Component({
  selector: "app-select-project",
  templateUrl: "./select-project.component.html",
  styleUrls: ["./select-project.component.scss"]
})
export class SelectProjectComponent {
  projects$ = this.routerFacade.params$.pipe(
    pluck("connectionId"),
    distinctUntilChanged(),
    tap((connectionId: string) =>
      this.connectionFacade.selectConnection(connectionId)
    ),
    switchMap(params =>
      this.connectionFacade.selectedConnection$.pipe(
        filter(
          (connection: Connection) => !!connection && !!connection.projects
        ),
        map((connection: Connection) =>
          Object.keys(connection.projects).map(
            keys => connection.projects[keys]
          )
        )
      )
    )
  );

  constructor(
    private routerFacade: RouterFacade,
    private connectionFacade: ConnectionFacade,
    private route: ActivatedRoute
  ) {}

  handleProjectSelect(project: Project) {
    this.routerFacade.params$.pipe(take(1)).subscribe(params => {
      this.routerFacade.navigate({
        path: [`/connections/${params.connectionId}/projects/${project.id}`]
      });
    });
  }
}
