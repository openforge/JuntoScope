import {
  Component,
  Input,
  Output,
  ChangeDetectionStrategy,
  EventEmitter
} from "@angular/core";
import { TaskList } from "../../../../models/task-list";

@Component({
  selector: "app-task-list",
  templateUrl: "./task-list.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskListComponent {
  @Input() taskList: TaskList;
  @Output() toggle = new EventEmitter<boolean>();
}
