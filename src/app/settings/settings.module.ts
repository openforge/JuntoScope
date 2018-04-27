import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from '@app/settings/settings-routing.module';
import { SettingsComponent } from '@app/settings/containers/settings/settings.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [CommonModule, SettingsRoutingModule, IonicModule],
  declarations: [SettingsComponent],
})
export class SettingsModule {}
