import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { PrivacyPage } from "./privacy";
import { SharedModule } from "../../../../shared/shared.module";

@NgModule({
  declarations: [PrivacyPage],
  imports: [IonicPageModule.forChild(PrivacyPage), SharedModule],
  exports: [PrivacyPage]
})
export class PrivacyPageModule {}
