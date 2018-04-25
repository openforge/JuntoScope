import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-import-projects-list',
  templateUrl: './import-projects-list.component.html',
  styleUrls: ['./import-projects-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImportProjectsListComponent {
  @Input() account: any;
  @Input() projects: any[];
}
