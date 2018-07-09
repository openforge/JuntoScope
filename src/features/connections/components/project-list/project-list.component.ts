import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from "@angular/core";

import { Project } from "../../../../models/project";

@Component({
  selector: "app-project-list",
  templateUrl: "./project-list.component.html",
  styleUrls: ["./project-list.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectListComponent {
  @Input() projects: Project[];
  @Output() select = new EventEmitter<Project>();
}
