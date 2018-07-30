import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from "@angular/core";

import { Project } from "../../../../models/project";
import { Connection } from "../../../../models/connection";

@Component({
  selector: "app-project-list",
  templateUrl: "./project-list.component.html"
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectListComponent {
  @Input() projects: Project[];
  // @Input() connections: Connection[];
  @Output() select = new EventEmitter<Project>();
}
