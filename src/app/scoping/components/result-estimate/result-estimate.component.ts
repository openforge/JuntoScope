import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-result-estimate',
  templateUrl: './result-estimate.component.html',
  styleUrls: ['./result-estimate.component.scss'],
})
export class ResultEstimateComponent implements OnInit {
  @Input() estimate: number;

  constructor() {}

  ngOnInit() {}
}
