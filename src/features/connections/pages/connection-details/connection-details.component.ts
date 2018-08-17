import { Component, OnInit, OnDestroy } from "@angular/core";
import { NavParams, IonicPage, NavController } from "ionic-angular";

import { Subscription } from "rxjs";
import { TakeUntilDestroy } from "ngx-take-until-destroy";

import { Connection } from "../../../../models/connection";
import { ConnectionFacade } from "../../store/connection.facade";
import { PopupService } from "../../../../shared/popup.service";

@TakeUntilDestroy()
@IonicPage({
  segment: "ConnectionDetailsPage",
  priority: "high"
})
@Component({
  selector: "app-connection-details",
  templateUrl: "./connection-details.component.html"
})
export class ConnectionDetailsPage implements OnInit, OnDestroy {
  connectionId = this.navParams.get("connectionId");
  connection: Connection;
  connectionSub: Subscription;

  constructor(
    private connectionFacade: ConnectionFacade,
    private navParams: NavParams,
    private navCtrl: NavController,
    private popupSvc: PopupService
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
    this.popupSvc.customButtonsAlert(
      "Delete Connection",
      "Are you sure you would like to delete this connection? Please confirm below.",
      [
        {
          text: "Cancel",
          role: "cancel"
        },
        {
          text: "Confirm",
          handler: () => {
            this.connectionFacade.removeConnection(connectionId);
            this.navCtrl.pop();
          }
        }
      ]
    );
  }
}
