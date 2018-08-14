import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { SharedModule } from "../../../../shared/shared.module";
import { SelectProjectPage } from "./select-project.component";
import { ConnectionsModule } from "../../connections.module";

@NgModule({
  declarations: [SelectProjectPage],
  imports: [
    IonicPageModule.forChild(SelectProjectPage),
    SharedModule,
    ConnectionsModule
  ],
  exports: [SelectProjectPage]
})
export class SelectProjectPageModule {}
