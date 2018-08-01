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

  get sessionStatus(): string {
    return this.isComplete() ? "Complete" : "Incomplete";
  }

  get ctaText(): string {
    return this.isComplete() ? "View Results" : "Continue";
  }

  get formattedTime(): string {
    return moment(this.time).format("l");
  }

  handleOptionsClick() {
    const userType =
      this.item.ownerId === this.uid
        ? SessionUserType.MODERATOR
        : SessionUserType.PARTICIPANT;

    this.options.emit(userType);
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
