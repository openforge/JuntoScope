import { NgModule } from "@angular/core";
import { IonicModule } from "ionic-angular";

import { SharedModule } from "../../shared/shared.module";
import { ConnectionDetailsComponent } from "../connections/pages/connection-details/connection-details.component";

@NgModule({
  imports: [IonicModule, SharedModule],
  declarations: [ConnectionDetailsComponent],
  exports: [],
  entryComponents: [],
  providers: []
})
export class SettingsModule {}
