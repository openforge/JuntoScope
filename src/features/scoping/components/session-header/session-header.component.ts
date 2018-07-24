import { Component, Input, OnInit } from "@angular/core";
import { ScopingSession } from "../../../../models/scoping-session";

@Component({
  selector: "app-session-header",
  templateUrl: "./session-header.component.html"
})
export class SessionHeaderComponent implements OnInit {
  @Input() session: ScopingSession;

  constructor() {}

  ngOnInit() {}
}
