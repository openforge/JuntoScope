import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../../../../models/task';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
})
export class TaskCardComponent implements OnInit {
  @Input() task: Task;

  @Input() onlyTitle: boolean;

  constructor() {}

  ngOnInit() {}
}
