import { Component, OnInit, OnDestroy } from '@angular/core';

import { TakeUntilDestroy, untilDestroyed } from 'ngx-take-until-destroy';

import { map, filter, withLatestFrom, take } from 'rxjs/operators';

import { RouterFacade } from '../../../state/router.facade';

@TakeUntilDestroy()
@Component({
  selector: 'app-import-projects',
  templateUrl: './import-projects.component.html',
  styleUrls: ['./import-projects.component.scss'],
})
export class ImportProjectsComponent implements OnDestroy {
  account: any;
  projects: any[];

  constructor(private routerFacade: RouterFacade) {}

  ngOnDestroy() {}

  importProjects() {}
}
