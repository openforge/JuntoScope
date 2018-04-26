import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from '@app/settings/settings-routing.module';
import { SettingsComponent } from '@app/settings/containers/settings/settings.component';

@NgModule({
  imports: [CommonModule, SettingsRoutingModule],
  declarations: [SettingsComponent],
})
export class SettingsModule {}
