import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScopingRoutingModule } from '@app/scoping/scoping-routing.module';
import { DashboardComponent } from '@app/scoping/containers/dashboard/dashboard.component';
import { GreetingsComponent } from '@app/scoping/component/greetings/greetings.component';

@NgModule({
  imports: [CommonModule, ScopingRoutingModule],
  declarations: [DashboardComponent, GreetingsComponent],
})
export class ScopingModule {}
