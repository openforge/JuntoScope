import { Component } from '@angular/core';

import {
  map,
  tap,
  filter,
  switchMap,
  pluck,
  distinctUntilChanged,
} from 'rxjs/operators';

import { RouterFacade } from '@app/state/router.facade';
import { ConnectionFacade } from '@app/connections/state/connection.facade';

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
    private connectionFacade: ConnectionFacade
  ) {}
}
