import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-scopes-list',
  templateUrl: './scopes-list.component.html',
  styleUrls: ['./scopes-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScopesListComponent {
  @Input() scopes: any[];
}
