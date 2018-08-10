import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { SharedModule } from "../../../../shared/shared.module";
import { ConnectionDetailsPage } from "./connection-details.component";

@NgModule({
  declarations: [ConnectionDetailsPage],
  imports: [IonicPageModule.forChild(ConnectionDetailsPage), SharedModule],
  exports: [ConnectionDetailsPage]
})
export class ConnectionDetailsPageModule {}
