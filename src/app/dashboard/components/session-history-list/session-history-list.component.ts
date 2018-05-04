import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { HistoryItem } from '@models/history-item';

@Component({
  selector: 'app-session-history-list',
  templateUrl: './session-history-list.component.html',
  styleUrls: ['./session-history-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SessionHistoryListComponent {
  @Input() items: HistoryItem[];
}
