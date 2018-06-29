import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { TermsPage } from "./terms";
import { AuthenticationModule } from "../../authentication.module";

@NgModule({
  declarations: [TermsPage],
  imports: [IonicPageModule.forChild(TermsPage), AuthenticationModule],
  exports: [TermsPage]
})
export class TermsPageModule {}
