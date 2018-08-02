import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from "@angular/core";

import { Project } from "../../../../models/project";
import { Connection } from "../../../../models/connection";
import { ConnectionFacade } from "../../store/connection.facade";
import { Observable } from "../../../../../node_modules/@firebase/util";

@Component({
  selector: "app-project-list",
  templateUrl: "./project-list.component.html"
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectListComponent {
  connection: Connection;

  constructor(private connectionFacade: ConnectionFacade) {}
  @Input() projects: Project[];
  @Output() select = new EventEmitter<Project>();

  ngOnInit() {
    this.connectionFacade.selectedConnection$
      .subscribe(con => {
        this.connection = con;
      })
      .unsubscribe();
  }
}
