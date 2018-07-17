import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";

import { DashboardComponent } from "./dashboard.component";
import { JoinSessionComponent } from "../../components/join-session/join-session.component";
import { SessionHistoryListComponent } from "../../components/session-history-list/session-history-list.component";
import { SessionHistoryItemComponent } from "../../components/session-history-item/session-history-item.component";
import { SessionDetailModalComponent } from "../../components/session-detail-modal/session-detail-modal.component";
import { ConnectionsModule } from "../../../connections/connections.module";
import { SelectProjectComponent } from "../../../connections/pages/select-project/select-project.component";
import { SelectTaskListComponent } from "../../../connections/pages/select-task-list/select-task-list.component";
import { ProjectListComponent } from "../../../connections/components/project-list/project-list.component";

@NgModule({
  declarations: [
    DashboardComponent,
    JoinSessionComponent,
    SessionHistoryListComponent,
    SessionHistoryItemComponent,
    SessionDetailModalComponent
    // SelectTaskListComponent,
  ],
  imports: [IonicPageModule.forChild(DashboardComponent), ConnectionsModule],
  exports: [DashboardComponent]
})
export class DashboardPageModule {}
