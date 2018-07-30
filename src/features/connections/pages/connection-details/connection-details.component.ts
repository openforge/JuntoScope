import { Component, OnInit, OnDestroy } from "@angular/core";
import { RouterFacade } from "../../../../store/router.facade";

import { take } from "rxjs/operators";
import { Observable } from "@firebase/util";
import { Connection } from "../../../../models/connection";
import { ConnectionFacade } from "../../store/connection.facade";
import { NavParams } from "ionic-angular";
import { Subscription } from "rxjs";

@Component({
  selector: "app-connection-details",
  templateUrl: "./connection-details.component.html"
})
export class ConnectionDetailsComponent implements OnInit, OnDestroy {
  connectionId = this.navParams.get("connectionId");
  connection: Connection;
  connectionSub: Subscription;

  constructor(
    private routerFacade: RouterFacade,
    private connectionFacade: ConnectionFacade,
    private navParams: NavParams
  ) {}

  ngOnInit() {
    this.connectionFacade.getConnections();

    this.connectionSub = this.connectionFacade.connections$.subscribe(
      (connections: Connection[]) => {
        if (connections) {
          this.connection = connections.filter(
            c => c.id === this.connectionId
          )[0];
        }
      }
    );
  }

  ngOnDestroy() {
    this.connectionSub.unsubscribe();
  }

  deleteConnection(connectionId) {
    this.connectionFacade.removeConnection(connectionId);
  }
}
