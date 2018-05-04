import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { ApiInterceptor } from '@app/shared/api.interceptor';
import { PopupService } from '@app/shared/popup.service';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, IonicModule],
  exports: [CommonModule, ReactiveFormsModule, HttpClientModule, IonicModule],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: ApiInterceptor,
          multi: true,
        },
        PopupService
      ],
    };
  }
}
