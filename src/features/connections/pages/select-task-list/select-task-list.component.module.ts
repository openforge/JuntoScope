import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { SharedModule } from "../../../../shared/shared.module";
import { SelectTaskListPage } from "./select-task-list.component";
import { ConnectionsModule } from "../../connections.module";

@NgModule({
  declarations: [SelectTaskListPage],
  imports: [
    IonicPageModule.forChild(SelectTaskListPage),
    SharedModule,
    ConnectionsModule
  ],
  exports: [SelectTaskListPage]
})
export class SelectTaskListPageModule {}
