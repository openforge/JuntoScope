import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { SessionScopingPage } from "./session-scoping.component";
import { ScopingModule } from "../../scoping.module";
import { SharedModule } from "../../../../shared/shared.module";

@NgModule({
  declarations: [SessionScopingPage],
  imports: [
    IonicPageModule.forChild(SessionScopingPage),
    ScopingModule,
    SharedModule
  ],
  exports: [],
  entryComponents: []
})
export class SessionScopingPageModule {}
