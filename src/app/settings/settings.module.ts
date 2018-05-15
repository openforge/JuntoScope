import { NgModule, ModuleWithProviders } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '@app/shared/shared.module';
import { SettingsRoutingModule } from '@app/settings/settings-routing.module';
import { SettingsComponent } from '@app/settings/containers/settings/settings.component';
import { SettingsFacade } from '@app/settings/state/settings.facade';
import { SettingsService } from './services/settings.service';
import { settingsReducer } from '@app/settings/state/settings.reducer';

@NgModule({
  imports: [
    SharedModule,
    SettingsRoutingModule,
    StoreModule.forFeature('settings', settingsReducer),
    EffectsModule.forFeature([SettingsFacade]),
    SharedModule,
  ],
  declarations: [SettingsComponent],
  entryComponents: [SettingsComponent],
})
export class SettingsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SettingsModule,
      providers: [SettingsService, SettingsFacade],
    };
  }
}
