import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";

import { DashboardPage } from "./dashboard.component";
import { DashboardModule } from "../../dashboard.module";
import { ConnectionsModule } from "../../../connections/connections.module";

@NgModule({
  declarations: [DashboardPage],
  imports: [
    IonicPageModule.forChild(DashboardPage),
    DashboardModule,
    ConnectionsModule
  ],
  exports: [],
  entryComponents: []
})
export class DashboardPageModule {}
