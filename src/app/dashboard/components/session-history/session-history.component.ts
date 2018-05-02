import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { HistoryItem } from '@models/history-item';

@Component({
  selector: 'app-session-history',
  templateUrl: './session-history.component.html',
  styleUrls: ['./session-history.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SessionHistoryComponent {
  @Input() historyItems: HistoryItem[];
}
