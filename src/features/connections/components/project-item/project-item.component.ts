import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from "@angular/core";

import { Project } from "../../../../models/project";

@Component({
  selector: "app-project-item",
  templateUrl: "./project-item.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectItemComponent {
  @Input() project: Project;
  @Output() select = new EventEmitter<Project>();
}
