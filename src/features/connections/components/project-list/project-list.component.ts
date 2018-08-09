import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";

import { Project } from "../../../../models/project";
import { Connection } from "../../../../models/connection";
import { ConnectionFacade } from "../../store/connection.facade";

@Component({
  selector: "app-project-list",
  templateUrl: "./project-list.component.html"
})
export class ProjectListComponent implements OnInit {
  @Input() projects: Project[];
  @Output() select = new EventEmitter<Project>();

  connection: Connection;

  constructor(private connectionFacade: ConnectionFacade) {}

  ngOnInit() {
    this.connectionFacade.selectedConnection$
      .subscribe(con => {
        this.connection = con;
      })
      .unsubscribe();
  }
}
