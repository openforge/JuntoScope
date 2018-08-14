import { Component, OnInit, Output, Input, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ScopingFacade } from "../../store/scoping.facade";

import { SessionValidation } from "../../../../models/scoping-session";
import { Store } from "@ngrx/store";
import { AppState } from "../../../../store/app.reducer";
import { CleanErrorAction } from "../../store/scoping.actions";
import { PopupService } from "../../../../shared/popup.service";
@Component({
  selector: "app-session-access",
  templateUrl: "./session-access.component.html"
})
export class SessionAccessComponent implements OnInit {
  accessForm: FormGroup;
  error$ = this.scopingFacade.error$;

  @Input() sessionLink: string;
  @Output() access = new EventEmitter<SessionValidation>();

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private scopingFacade: ScopingFacade,
    private popupSvc: PopupService
  ) {}

  ngOnInit() {
    this.createForm();
    this.error$.subscribe(error => {
      if (error) {
        this.popupSvc.simpleAlert("Uh Oh!", error, "OK");
        this.store.dispatch(new CleanErrorAction());
      }
    });
  }

  continue() {
    if (this.accessForm.valid) {
      const sessionValidation = {
        sessionLink: this.sessionLink,
        accessCode: this.accessForm.get("code").value
      };
      this.access.emit(sessionValidation);
    } else {
      this.accessForm.get("code").markAsDirty();
    }
  }

  createForm() {
    this.accessForm = this.fb.group({
      code: ["", Validators.required]
    });
  }
}
