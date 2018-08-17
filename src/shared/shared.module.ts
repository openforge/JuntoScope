import { NgModule, ModuleWithProviders } from "@angular/core";
import { IonicModule, Loading } from "ionic-angular";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { CommonModule } from "@angular/common";

import { ApiInterceptor } from "./api.interceptor";
import { PopupService } from "./popup.service";
import { LoadingService } from "./loading.service";
import {
  ObjectKeysPipe,
  ObjectValuesPipe,
  ObjectKeyValuePipe
} from "./pipes/object-iterators.pipe";
import { InfoModalComponent } from "./components/info-modal/info-modal";

@NgModule({
  imports: [IonicModule, FormsModule, ReactiveFormsModule, CommonModule],
  declarations: [
    ObjectKeysPipe,
    ObjectValuesPipe,
    ObjectKeyValuePipe,
    InfoModalComponent
  ],
  entryComponents: [InfoModalComponent],
  exports: [
    ObjectKeysPipe,
    ObjectValuesPipe,
    ObjectKeyValuePipe,
    InfoModalComponent,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: ApiInterceptor,
          multi: true
        },
        PopupService,
        LoadingService
      ]
    };
  }
}
