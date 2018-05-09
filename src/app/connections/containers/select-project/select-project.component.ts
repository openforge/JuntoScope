import { Component, OnInit } from '@angular/core';
import { TakeUntilDestroy, untilDestroyed } from 'ngx-take-until-destroy';
import { ConnectionService } from '@app/connections/services/connection.service';
import { ConnectionFacade } from '@app/connections/state/connection.facade';
import { Router } from '@angular/router';
import { RouterFacade } from '@app/state/router.facade';

import { map, tap, filter } from 'rxjs/operators';

@TakeUntilDestroy()
@Component({
  selector: 'app-select-project',
  templateUrl: './select-project.component.html',
  styleUrls: ['./select-project.component.scss'],
})
export class SelectProjectComponent implements OnInit {
  constructor(
    private connectionService: ConnectionService,
    private router: Router,
    private routerFacade: RouterFacade,
    private connectionFacade: ConnectionFacade
  ) {}

  params$ = this.routerFacade.params$;
  connections$ = this.connectionFacade.connections$;
  connectionId;
  connection;
  projects;

  ngOnInit() {
    this.connections$.subscribe(connections => {
      if (!connections) {
        this.connectionFacade.getConnections();
      }

      this.connection = connections.filter(connection => {
        return connection.id === params.connectionId;
      })[0];
    });

    this.getProjects();
  }

  getProjects() {
    // this.url$.subscribe(url => {
    //   this.connectionId = url.split("/")[2];
    // });

    this.params$.subscribe(params => {
      console.log(params);
      this.connectionFacade.selectConnection(params.connectionId);
    });

    // this.connections$.subscribe((connections) => {
    //   this.connection = connections.filter(
    //     c => c.id === this.connectionId
    //   )[0];
    //   this.connectionFacade.selectConnection(this.connection);
    // this.connectionService.getProjects(this.connection).subscribe((res) => {
    //   this.projects = res.projects;
    // })
    // });
  }
}
