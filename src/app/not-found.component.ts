import { Component } from "@angular/core";

@Component({
  selector: "app-not-found",
  template: `
    <p>
      Uh Oh ... '{{ url$ | async }}' Not Found!
    </p>
  `,
  styles: []
})
export class NotFoundComponent {
  // url$ = this.routerFacade.url$;

  constructor() {}
}
