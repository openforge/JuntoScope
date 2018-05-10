import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-select-result',
  templateUrl: './select-result.component.html',
  styleUrls: ['./select-result.component.scss'],
})
export class SelectResultComponent implements OnInit {
  @Input() avg: number;

  @Input() max: number;

  @Output() estimate = new EventEmitter<number>();

  constructor() {}

  ngOnInit() {}

  select(finalEstimate) {
    this.estimate.emit(finalEstimate);
  }

  selectCustom() {}
}
