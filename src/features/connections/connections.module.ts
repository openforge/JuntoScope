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
import { ConnectionListComponent } from "./components/connection-list/connection-list.component";
import { JoinSessionComponent } from "../dashboard/components/join-session/join-session.component";
import { HistoryService } from "../dashboard/services/history.service";
import { HttpClient } from "@angular/common/http";

@NgModule({
  imports: [IonicModule, SharedModule],
  exports: [ConnectionListComponent],
  declarations: [
    InstructionsComponent,
    VerifyModalComponent,
    ProjectListComponent,
    TaskListComponent,
    ProjectItemComponent,
    ConnectionListComponent
  ],
  entryComponents: [VerifyModalComponent],
  providers: [HistoryService, ConnectionFacade, ConnectionService]
})
export class ConnectionsModule {}
