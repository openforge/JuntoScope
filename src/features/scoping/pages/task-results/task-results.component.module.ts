import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { TaskResultsPage } from "./task-results.component";
import { ScopingModule } from "../../scoping.module";
import { SharedModule } from "../../../../shared/shared.module";

@NgModule({
  declarations: [TaskResultsPage],
  imports: [
    IonicPageModule.forChild(TaskResultsPage),
    ScopingModule,
    SharedModule
  ],
  exports: [],
  entryComponents: []
})
export class TaskResultsPageModule {}
