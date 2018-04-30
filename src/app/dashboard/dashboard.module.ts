import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';
import { DashboardRoutingModule } from '@app/dashboard/dashboard-routing.module';
import { DashboardComponent } from '@app/dashboard/container/dashboard/dashboard.component';

@NgModule({
  imports: [SharedModule, DashboardRoutingModule],
  declarations: [DashboardComponent],
})
export class DashboardModule {}
