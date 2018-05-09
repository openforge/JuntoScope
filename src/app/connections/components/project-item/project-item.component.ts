import { Component, OnInit, Input } from '@angular/core';
import { Project } from '@models/project';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss'],
})
export class ProjectItemComponent implements OnInit {
  constructor() {}

  @Input() project: Project;

  ngOnInit() {}
}
