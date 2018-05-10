import { NgModule, ModuleWithProviders } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '@app/shared/shared.module';
import { ConnectionsRoutingModule } from '@app/connections/connections-routing.module';
import { AddConnectionComponent } from '@app/connections/containers/add-connection/add-connection.component';
import { ConnectionDetailsComponent } from '@app/connections/containers/connection-details/connection-details.component';
import { InstructionsComponent } from '@app/connections/components/instructions/instructions.component';
import { connectionReducer } from '@app/connections/state/connection.reducer';
import { ConnectionFacade } from '@app/connections/state/connection.facade';
import { ConnectionService } from '@app/connections/services/connection.service';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskItemComponent } from './components/task-item/task-item.component';
import { ProjectItemComponent } from './components/project-item/project-item.component';
import { SelectProjectComponent } from './containers/select-project/select-project.component';
import { SelectTaskListComponent } from './containers/select-task-list/select-task-list.component';
import { VerifyModalComponent } from '@app/connections/components/verify-modal/verify-modal.component';

@NgModule({
  imports: [
    ConnectionsRoutingModule,
    StoreModule.forFeature('connection', connectionReducer),
    EffectsModule.forFeature([ConnectionFacade]),
    SharedModule,
  ],
  declarations: [
    AddConnectionComponent,
    InstructionsComponent,
    ConnectionDetailsComponent,
    ProjectListComponent,
    TaskListComponent,
    TaskItemComponent,
    ProjectItemComponent,
    SelectProjectComponent,
    SelectTaskListComponent,
    VerifyModalComponent,
  ],
  entryComponents: [VerifyModalComponent],
})
export class ConnectionsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ConnectionsModule,
      providers: [ConnectionService, ConnectionFacade],
    };
  }
}
