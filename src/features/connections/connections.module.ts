import { NgModule, ModuleWithProviders } from "@angular/core";
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
import { ShareScopeLinkModalComponent } from "./components/share-scope-link-modal/share-scope-link-modal.component";

@NgModule({
  imports: [
    SharedModule,
    StoreModule.forFeature("connection", connectionReducer),
    EffectsModule.forFeature([ConnectionFacade])
  ],
  declarations: [
    ConnectionListComponent,
    InstructionsComponent,
    ProjectItemComponent,
    ProjectListComponent,
    TaskListComponent,
    VerifyModalComponent,
    ShareScopeLinkModalComponent
  ],
  entryComponents: [VerifyModalComponent, ShareScopeLinkModalComponent],
  exports: [TaskListComponent, ProjectListComponent, ConnectionListComponent],
  providers: []
})
export class ConnectionsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ConnectionsModule,
      providers: [ConnectionFacade, ConnectionService]
    };
  }
}
