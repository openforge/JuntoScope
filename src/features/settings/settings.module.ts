import { NgModule } from "@angular/core";
import { IonicModule } from "ionic-angular";

import { SharedModule } from "../../shared/shared.module";
import { ConnectionsModule } from "../connections/connections.module";

@NgModule({
  imports: [IonicModule, SharedModule, ConnectionsModule],
  declarations: [],
  exports: [],
  entryComponents: [],
  providers: []
})
export class SettingsModule {}
