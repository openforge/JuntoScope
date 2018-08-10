import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { SessionResultsPage } from "./session-results.component";
import { ScopingModule } from "../../scoping.module";
import { SharedModule } from "../../../../shared/shared.module";

@NgModule({
  declarations: [SessionResultsPage],
  imports: [
    IonicPageModule.forChild(SessionResultsPage),
    ScopingModule,
    SharedModule
  ],
  exports: [],
  entryComponents: []
})
export class SessionResultsPageModule {}
