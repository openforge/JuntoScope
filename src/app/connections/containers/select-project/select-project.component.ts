import { Component } from '@angular/core';

import {
  map,
  tap,
  filter,
  switchMap,
  take,
  pluck,
  distinctUntilChanged,
} from 'rxjs/operators';

import { RouterFacade } from '@app/state/router.facade';
import { ConnectionFacade } from '@app/connections/state/connection.facade';
import { ActivatedRoute } from '@angular/router';
import { Project } from '@models/project';

@Component({
  selector: 'app-select-project',
  templateUrl: './select-project.component.html',
  styleUrls: ['./select-project.component.scss'],
})
export class SelectProjectComponent {
  projects$ = this.routerFacade.params$.pipe(
    pluck('connectionId'),
    distinctUntilChanged(),
    tap((connectionId: string) =>
      this.connectionFacade.selectConnection(connectionId)
    ),
    switchMap(params =>
      this.connectionFacade.selectedConnection$.pipe(
        filter(connection => !!connection && !!connection.projects),
        map(connection => Object.values(connection.projects))
      )
    )
  );

  constructor(
    private routerFacade: RouterFacade,
    private connectionFacade: ConnectionFacade,
    private route: ActivatedRoute
  ) {}

  handleProjectSelect(project: Project) {
    this.routerFacade.params$.pipe(take(1)).subscribe(params => {
      this.routerFacade.navigate({
        path: [`/connections/${params.connectionId}/projects/${project.id}`],
      });
    });
  }
}
