import { Component, OnInit, OnDestroy } from '@angular/core';

import { TakeUntilDestroy, untilDestroyed } from 'ngx-take-until-destroy';

import { map, filter, withLatestFrom, take } from 'rxjs/operators';

import { RouterFacade } from '../../../state/router.facade';

@TakeUntilDestroy()
@Component({
  selector: 'app-add-projects',
  templateUrl: './add-projects.component.html',
  styleUrls: ['./add-projects.component.scss'],
})
export class AddProjectsComponent implements OnDestroy {
  accounts: any[];

  constructor(private routerFacade: RouterFacade) {}

  ngOnDestroy() {}

  selectAccount() {}

  addAccount() {}
}
