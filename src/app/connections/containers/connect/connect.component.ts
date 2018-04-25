import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterFacade } from '@app/state/router.facade';
import { ConnectionFacade } from '@app/connections/state/connection.facade';

@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.scss'],
})
export class ConnectComponent implements OnInit {
  connections$ = this.connectionFacade.connections$;
  connectionTypes = ['teamwork'];

  constructor(
    private routerFacade: RouterFacade,
    private connectionFacade: ConnectionFacade
  ) {}

  ngOnInit() {
    this.connectionFacade.getConnections();
  }

  connect(type: string) {
    this.routerFacade.navigate({ path: ['/connections/' + type] });
  }
}
