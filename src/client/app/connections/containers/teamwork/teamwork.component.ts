import { Component, OnInit } from '@angular/core';

import { AuthFacade } from '../../../authentication/state/auth.facade';
import { AuthCase } from '../../../authentication/state/auth.reducer';

@Component({
  selector: 'app-teamwork',
  templateUrl: './teamwork.component.html',
  styleUrls: ['./teamwork.component.scss'],
})
export class TeamworkComponent implements OnInit {
  user$ = this.authFacade.user$;

  constructor(private authFacade: AuthFacade) {}

  ngOnInit() {}

  continue(event: UIEvent) {
    event.preventDefault();
    console.log('Add with token');
  }
}
