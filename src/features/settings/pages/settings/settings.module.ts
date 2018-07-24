import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { SettingsPage } from "./settings";
import { SettingsModule } from "../../settings.module";

import { ConnectionsModule } from "../../../connections/connections.module";

@NgModule({
  declarations: [SettingsPage],
  imports: [IonicPageModule.forChild(SettingsPage), SettingsModule, ConnectionsModule],
  exports: [SettingsPage]
})
export class SettingsPageModule {}
