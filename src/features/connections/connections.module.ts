import { NgModule, ModuleWithProviders } from "@angular/core";
import { IonicModule } from "ionic-angular";

import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { SharedModule } from "../../shared/shared.module";
import { connectionReducer } from "./store/connection.reducer";
import { ConnectionFacade } from "./store/connection.facade";
import { ConnectionService } from "./services/connection.service";
import { VerifyModalComponent } from "./components/verify-modal/verify-modal.component";
import { ProjectListComponent } from "./components/project-list/project-list.component";
import { TaskListComponent } from "./components/task-list/task-list.component";
import { ProjectItemComponent } from "./components/project-item/project-item.component";
import { InstructionsComponent } from "./components/instructions/instructions.component";

@NgModule({
  imports: [IonicModule, SharedModule],
  exports: [],
  declarations: [
    InstructionsComponent,
    VerifyModalComponent,
    ProjectListComponent,
    TaskListComponent,
    ProjectItemComponent
  ],
  entryComponents: [VerifyModalComponent],
  providers: []
})
export class ConnectionsModule {}
