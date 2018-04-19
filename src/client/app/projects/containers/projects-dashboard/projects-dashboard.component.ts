import { Component, OnInit, OnDestroy } from '@angular/core';

import { TakeUntilDestroy, untilDestroyed } from 'ngx-take-until-destroy';

import { map, filter, withLatestFrom, take } from 'rxjs/operators';

import { RouterFacade } from '../../../state/router.facade';

@TakeUntilDestroy()
@Component({
  selector: 'app-projects-dashboard',
  templateUrl: './projects-dashboard.component.html',
  styleUrls: ['./projects-dashboard.component.scss'],
})
export class ProjectsDashboardComponent implements OnDestroy {
  projects: any[];
  scopes: any[];

  constructor(private routerFacade: RouterFacade) {}

  ngOnDestroy() {}
}
