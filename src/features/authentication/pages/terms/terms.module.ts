import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { TermsPage } from "./terms";
import { SharedModule } from "../../../../shared/shared.module";

@NgModule({
  declarations: [TermsPage],
  imports: [IonicPageModule.forChild(TermsPage), SharedModule],
  exports: [TermsPage]
})
export class TermsPageModule {}
