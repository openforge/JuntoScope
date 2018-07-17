import { Component, OnInit } from "@angular/core";
import { RouterFacade } from "../../../../store/router.facade";

import { take } from "rxjs/operators";
import { Observable } from "@firebase/util";
import { Connection } from "../../../../models/connection";
import { ConnectionFacade } from "../../store/connection.facade";
import { NavParams } from "ionic-angular";

@Component({
  selector: "app-connection-details",
  templateUrl: "./connection-details.component.html"
})
export class ConnectionDetailsComponent implements OnInit {
  connectionId = this.navParams.get("connectionId");
  connection: Connection;

  constructor(
    private routerFacade: RouterFacade,
    private connectionFacade: ConnectionFacade,
    private navParams: NavParams
  ) {}

  ngOnInit() {
    this.connectionFacade.getConnections();
    // this.params$.pipe(take(1)).subscribe(params => {
    //   this.connectionFacade.connections$.subscribe(
    //     (connections: Connection[]) => {
    //       if (connections) {
    //         this.connection = connections.filter(
    //           c => c.id === params.connectionId
    //         )[0];
    //       }
    //     }
    //   );
    // });
    this.connectionFacade.connections$.subscribe(
      (connections: Connection[]) => {
        if (connections) {
          this.connection = connections.filter(
            c => c.id === this.connectionId
          )[0];
        }
      }
    );
  }
}
