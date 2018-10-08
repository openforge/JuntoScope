import {
  Component,
  ChangeDetectionStrategy,
  Output,
  EventEmitter
} from "@angular/core";

@Component({
  selector: "app-join-session",
  templateUrl: "./join-session.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JoinSessionComponent {
  @Output() join = new EventEmitter<string>();

  onJoin(sessionCode: string) {
    if (sessionCode.includes("juntoscope.com")) {
      sessionCode = sessionCode.substring(sessionCode.lastIndexOf("/") + 1);
    }
    console.log(sessionCode);
    if (sessionCode && sessionCode.length > 3) {
      this.join.emit(sessionCode);
    }
  }
}
