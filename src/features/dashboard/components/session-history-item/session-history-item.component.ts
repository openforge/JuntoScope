import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from "@angular/core";

import moment from "moment";

import { HistoryItem } from "../../../../models/history-item";
import { SessionUserType } from "../../../../models/user";
import { SessionStatus } from "../../../../models/scoping-session";

@Component({
  selector: "app-session-history-item",
  templateUrl: "./session-history-item.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SessionHistoryItemComponent {
  @Input() item: HistoryItem;
  @Input() uid: string;
  @Input() time: number;

  @Output() options = new EventEmitter<SessionUserType>();
  @Output() detail = new EventEmitter<SessionStatus>();

  get isSessionOwner(): boolean {
    return this.item && this.item.ownerId === this.uid;
  }

  get sessionUserType():
    | SessionUserType.MODERATOR
    | SessionUserType.PARTICIPANT {
    return this.isSessionOwner
      ? SessionUserType.MODERATOR
      : SessionUserType.PARTICIPANT;
  }

  get sessionStatus(): string {
    return this.isComplete() ? "Complete" : "Incomplete";
  }

  get sessionRoleAbbreviation(): string {
    return this.sessionUserType === SessionUserType.MODERATOR ? "M" : "P";
  }

  get ctaText(): string {
    return this.isComplete() ? "View Results" : "Continue";
  }

  get formattedTime(): string {
    return moment(this.time).format("l");
  }

  handleOptionsClick() {
    this.options.emit(this.sessionUserType);
  }

  handleDetailClick() {
    this.detail.emit(
      this.isComplete() ? SessionStatus.COMPLETE : SessionStatus.INCOMPLETE
    );
  }

  private isComplete() {
    return this.item.numScopedTasks === this.item.numTasks;
  }
}
