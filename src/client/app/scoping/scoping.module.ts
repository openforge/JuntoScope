import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScopingRoutingModule } from '@app/scoping/scoping-routing.module';
import { SessionScopingComponent } from './containers/session-scoping/session-scoping.component';

@NgModule({
  imports: [CommonModule, ScopingRoutingModule],
  declarations: [SessionScopingComponent],
})
export class ScopingModule {}
