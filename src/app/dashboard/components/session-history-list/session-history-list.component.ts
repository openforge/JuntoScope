import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  HistoryItem,
  HistoryItemOptionEvent,
  HistoryItemDetailEvent,
} from '@models/history-item';
import { SessionUserType } from '@models/user';
import { SessionStatus } from '@models/scoping-session';

@Component({
  selector: 'app-session-history-list',
  templateUrl: './session-history-list.component.html',
  styleUrls: ['./session-history-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SessionHistoryListComponent {
  @Input() items: HistoryItem[];
  @Input() uid: string;

  @Output() options = new EventEmitter<HistoryItemOptionEvent>();
  @Output() detail = new EventEmitter<HistoryItemDetailEvent>();

  handleOptionClick(userType: SessionUserType, item: HistoryItem) {
    this.options.emit({ userType, item });
  }

  handleDetailClick(status: SessionStatus, item: HistoryItem) {
    this.detail.emit({ status, item });
  }
}
