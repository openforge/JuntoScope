import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { PrivacyPage } from "./privacy";
import { AuthenticationModule } from "../../authentication.module";

@NgModule({
  declarations: [PrivacyPage],
  imports: [IonicPageModule.forChild(PrivacyPage)],
  exports: [PrivacyPage]
})
export class PrivacyPageModule {}
