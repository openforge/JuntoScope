import { NgModule, ModuleWithProviders } from "@angular/core";
import { RouterModule } from "@angular/router";
import { RouterStateSerializer } from "@ngrx/router-store";
import { CustomSerializer } from "../store/router.reducer";
import { RouterFacade } from "../store/router.facade";

@NgModule({
  imports: [],
  exports: [RouterModule]
})
export class AppRoutingModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AppRoutingModule,
      providers: [
        {
          provide: RouterStateSerializer,
          useClass: CustomSerializer
        },
        RouterFacade
      ]
    };
  }
}