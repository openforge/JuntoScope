import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { SettingsPage } from "./settings";
import { SettingsModule } from "../../settings.module";

@NgModule({
  declarations: [SettingsPage],
  imports: [IonicPageModule.forChild(SettingsPage), SettingsModule],
  exports: [SettingsPage]
})
export class SettingsPageModule {}
