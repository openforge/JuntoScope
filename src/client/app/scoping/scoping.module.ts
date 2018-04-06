import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScopingRoutingModule } from './scoping-routing.module';
import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { GreetingsComponent } from './component/greetings/greetings.component';

@NgModule({
  imports: [CommonModule, ScopingRoutingModule],
  declarations: [DashboardComponent, GreetingsComponent],
})
export class ScopingModule {}
