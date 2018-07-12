import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from "@angular/core";

import { Connection } from "../../../../models/connection";

@Component({
  selector: "app-connection-list",
  templateUrl: "./connection-list.component.html"
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConnectionListComponent {
  @Input() connections: Connection[];
  @Output() select = new EventEmitter<Connection>();
  @Output() add = new EventEmitter<never>();
}
