import { NgModule } from "@angular/core";

import { SharedModule } from "@app/shared/shared.module";
import { SettingsRoutingModule } from "@app/settings/settings-routing.module";
import { SettingsComponent } from "@app/settings/containers/settings/settings.component";

@NgModule({
  imports: [SharedModule, SettingsRoutingModule],
  declarations: [SettingsComponent]
})
export class SettingsModule {}
