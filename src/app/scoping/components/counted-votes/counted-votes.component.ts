import { Component, OnInit, Input } from '@angular/core';
import { Votes } from '../../../../models/task';
import * as _ from 'lodash';

@Component({
  selector: 'app-counted-votes',
  templateUrl: './counted-votes.component.html',
  styleUrls: ['./counted-votes.component.scss'],
})
export class CountedVotesComponent implements OnInit {
  @Input() votes: Array<Votes>;

  @Input() participantCount: number;

  constructor() {}

  ngOnInit() {}

  getRangeForEmptyVotes(num) {
    return _.range(num);
  }
}
