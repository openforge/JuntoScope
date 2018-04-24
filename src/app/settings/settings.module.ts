import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './containers/settings/settings.component';
import { ManageConnectionsComponent } from './containers/manage-connections/manage-connections.component';

@NgModule({
  imports: [CommonModule, SettingsRoutingModule],
  declarations: [SettingsComponent, ManageConnectionsComponent],
})
export class SettingsModule {}
