import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsListComponent {
  @Input() projects: any[];
}
